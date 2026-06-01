// SRS flashcards view
const FlashcardsView = {
  state: { queue: [], current: null, flipped: false, level: null, levelView: true },

  render(container) {
    container.innerHTML = "";
    FlashcardsView.state.levelView = true;
    FlashcardsView.renderLevelPicker(container);
  },

  renderLevelPicker(container) {
    const header = document.createElement("div");
    header.className = "view-header";
    header.innerHTML = `
      <h2>Vocabulary Flashcards</h2>
      <p>Pick a level. Cards adapt to your performance — easy ones come back less often, hard ones more.</p>
    `;
    container.appendChild(header);

    const state = Storage.load();
    const accuracy = state.totalReviews > 0
      ? Math.round((state.correctReviews / state.totalReviews) * 100)
      : 0;

    const stats = document.createElement("div");
    stats.className = "stat-grid";
    stats.innerHTML = `
      <div class="stat-tile"><div class="stat-num">${state.totalReviews}</div><div class="stat-label">Total reviews</div></div>
      <div class="stat-tile"><div class="stat-num">${accuracy}%</div><div class="stat-label">Accuracy</div></div>
      <div class="stat-tile"><div class="stat-num">${Object.keys(state.srs).length}</div><div class="stat-label">Cards started</div></div>
    `;
    container.appendChild(stats);

    const heading = document.createElement("h3");
    heading.className = "section-title";
    heading.textContent = "Choose a level";
    container.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "grid large";

    const levelInfo = [
      { l: 1, name: "Foundations", desc: "Greetings, pronouns, basic family." },
      { l: 2, name: "Survival", desc: "Food, places, time of day." },
      { l: 3, name: "Daily Life", desc: "Verbs, question words, adjectives." },
      { l: 4, name: "Conversational", desc: "Emotions, connectors, work & study." },
      { l: 5, name: "Advanced", desc: "Abstract nouns, idioms, nuanced vocabulary." },
    ];

    for (const li of levelInfo) {
      const cards = VOCAB[li.l] || [];
      const studied = cards.filter(c => state.srs[`v${li.l}_${c.gu}`]).length;
      const pct = cards.length ? Math.round((studied / cards.length) * 100) : 0;

      const card = document.createElement("div");
      card.className = "lesson-card";
      card.innerHTML = `
        <span class="level-badge">Level ${li.l}</span>
        <h3>${li.name}</h3>
        <p>${li.desc} · ${cards.length} cards</p>
        <div class="progress-bar"><span style="width: ${pct}%"></span></div>
      `;
      card.addEventListener("click", () => FlashcardsView.startLevel(container, li.l));
      grid.appendChild(card);
    }
    container.appendChild(grid);
  },

  startLevel(container, level) {
    const cards = (VOCAB[level] || []).map(v => ({
      id: `v${level}_${v.gu}`,
      front: v.gu,
      translit: v.translit,
      back: v.en,
      raw: v,
    }));

    const queue = Storage.getDueCards(cards, 20);
    if (queue.length === 0) {
      toast("No cards due — pick another level or come back later.");
      return;
    }
    FlashcardsView.state = { queue, current: null, flipped: false, level, levelView: false };
    FlashcardsView.next(container);
  },

  next(container) {
    container.innerHTML = "";

    const back = document.createElement("div");
    back.className = "back-row";
    back.innerHTML = `<button class="back-btn">← Back to levels</button>
                      <span class="queue-stats">${FlashcardsView.state.queue.length} card${FlashcardsView.state.queue.length === 1 ? "" : "s"} left</span>`;
    back.querySelector(".back-btn").addEventListener("click", () => FlashcardsView.render(container));
    container.appendChild(back);

    if (FlashcardsView.state.queue.length === 0) {
      const done = document.createElement("div");
      done.className = "lesson-body";
      done.innerHTML = `<h3>Session complete! 🎉</h3>
        <p>You reviewed all due cards for this level. Come back tomorrow for the next round.</p>
        <button class="btn btn-primary" id="back-to-levels">Back to levels</button>`;
      done.querySelector("#back-to-levels").addEventListener("click", () => FlashcardsView.render(container));
      container.appendChild(done);
      return;
    }

    const cur = FlashcardsView.state.queue[0];
    FlashcardsView.state.current = cur;
    FlashcardsView.state.flipped = false;

    const stage = document.createElement("div");
    stage.className = "flashcard-stage";

    const cardEl = document.createElement("div");
    cardEl.className = "flashcard";
    cardEl.innerHTML = `
      <div class="front-gu">${cur.front}</div>
      <div class="translit">${cur.translit}</div>
      <div class="hint">Tap to reveal · Click 🔊 to hear</div>
    `;

    const speakBtn = speakButton(cur.front);
    speakBtn.style.position = "absolute";

    const wrap = document.createElement("div");
    wrap.style.position = "relative";
    wrap.appendChild(cardEl);

    const topSpeak = document.createElement("div");
    topSpeak.style.display = "flex";
    topSpeak.style.justifyContent = "center";
    topSpeak.style.marginBottom = "6px";
    topSpeak.appendChild(speakBtn);

    stage.appendChild(topSpeak);
    stage.appendChild(wrap);

    cardEl.addEventListener("click", () => {
      if (FlashcardsView.state.flipped) return;
      FlashcardsView.state.flipped = true;
      const ans = document.createElement("div");
      ans.className = "answer";
      ans.textContent = cur.back;
      cardEl.querySelector(".hint").remove();
      cardEl.appendChild(ans);
    });

    const controls = document.createElement("div");
    controls.className = "review-controls";
    controls.innerHTML = `
      <button class="btn-again">Again</button>
      <button class="btn-hard">Hard</button>
      <button class="btn-good">Good</button>
      <button class="btn-easy">Easy</button>
    `;
    const grade = (q) => {
      if (!FlashcardsView.state.flipped) {
        FlashcardsView.state.flipped = true;
        const ans = document.createElement("div");
        ans.className = "answer";
        ans.textContent = cur.back;
        cardEl.querySelector(".hint")?.remove();
        cardEl.appendChild(ans);
        setTimeout(() => grade(q), 500);
        return;
      }
      Storage.scheduleReview(cur.id, q);
      Storage.markStudiedToday();
      // Requeue if "Again"
      if (q === 0) FlashcardsView.state.queue.push(FlashcardsView.state.queue.shift());
      else FlashcardsView.state.queue.shift();
      FlashcardsView.next(container);
    };
    controls.querySelector(".btn-again").addEventListener("click", () => grade(0));
    controls.querySelector(".btn-hard").addEventListener("click",  () => grade(1));
    controls.querySelector(".btn-good").addEventListener("click",  () => grade(2));
    controls.querySelector(".btn-easy").addEventListener("click",  () => grade(3));
    stage.appendChild(controls);

    container.appendChild(stage);
  },
};
