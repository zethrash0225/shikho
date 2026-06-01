// Review tab — browse every Gujarati word the curriculum touches.
// Word pool is aggregated at view-render time from UNITS exercises, STORIES gloss,
// B2_REFERENCE, and ALPHABET. Each word is tagged with its source so we can show
// where it came from and filter to only "learned" (= words from completed lessons).
const ReviewView = {
  collectAll() {
    const items = [];
    const seen = new Set();
    function push(gu, en, sourceLabel, sourceId, learnedKey) {
      if (!gu || !en) return;
      const key = gu.trim();
      if (!key || seen.has(key)) return;
      seen.add(key);
      items.push({ gu: key, en: en.trim(), source: sourceLabel, sourceId, learnedKey });
    }

    // From UNITS — pull single-word / short-phrase items, skip long sentences
    if (typeof UNITS !== "undefined") {
      for (const u of UNITS) for (const l of u.lessons) for (const ex of l.exercises) {
        const src = `${u.title} · ${l.title}`;
        if ((ex.type === "mcGu" || ex.type === "mcEn" || ex.type === "listen") && ex.gu && ex.en) {
          if (ex.gu.split(/\s+/).length <= 3) push(ex.gu, ex.en, src, u.id, l.id);
        }
        if (ex.type === "match" && Array.isArray(ex.pairs)) {
          for (const p of ex.pairs) push(p.gu, p.en, src, u.id, l.id);
        }
      }
    }

    // From STORIES gloss
    if (typeof STORIES !== "undefined") {
      for (const s of STORIES) {
        if (!s.gloss) continue;
        for (const g of s.gloss) push(g.gu, g.en, `Story · ${s.titleEn}`, "stories", `story_${s.id}`);
      }
    }

    // From B2 reference
    if (typeof B2_REFERENCE !== "undefined") {
      for (const [topic, list] of Object.entries(B2_REFERENCE)) {
        for (const w of list) push(w.gu, w.en, `B2 · ${topic.replace(/_/g, " ")}`, "b2", null);
      }
    }

    // From alphabet (vowels + consonants + numbers)
    if (typeof ALPHABET !== "undefined") {
      for (const v of ALPHABET.vowels) push(v.char, `${v.translit} (vowel)`, "Alphabet · Vowels", "alphabet", null);
      for (const c of ALPHABET.consonants) push(c.char, `${c.translit} (consonant)`, "Alphabet · Consonants", "alphabet", null);
      for (const n of ALPHABET.numbers) push(n.char, `${n.value} — ${n.translit}`, "Alphabet · Numbers", "alphabet", null);
    }

    return items;
  },

  render(container) {
    container.innerHTML = "";

    const all = ReviewView.collectAll();
    const state = Storage.load();
    const completed = new Set(state.completedLessons || []);
    const lettersTapped = new Set(state.lettersLearned || []);

    // A word counts as "learned" only when there's an explicit signal:
    //  - Alphabet items: the user has tapped that letter (recorded in lettersLearned)
    //  - Curriculum / story items: the source lesson is in completedLessons
    //  - B2 reference: never auto-counted — it's reference material, not a lesson
    function isLearned(it) {
      if (it.sourceId === "alphabet") return lettersTapped.has(it.gu);
      if (it.sourceId === "b2") return false;
      return !!it.learnedKey && completed.has(it.learnedKey);
    }
    const learned = all.filter(isLearned);

    // ---- Header ----
    const header = document.createElement("div");
    header.className = "view-header";
    header.innerHTML = `
      <h2>Review</h2>
      <p>Every Gujarati word the curriculum touches — search, scroll, or filter to just what you've learned. Tap a word to hear it; tap the eye to reveal/hide its meaning.</p>
    `;
    container.appendChild(header);

    // ---- Status pills ----
    const stats = document.createElement("div");
    stats.className = "review-stats";
    stats.innerHTML = `
      <div class="review-stat"><div class="num">${learned.length}</div><div class="lbl">Words learned</div></div>
      <div class="review-stat"><div class="num">${all.length}</div><div class="lbl">In curriculum</div></div>
      <div class="review-stat"><div class="num">${Math.round((learned.length / Math.max(1, all.length)) * 100)}%</div><div class="lbl">Coverage</div></div>
    `;
    container.appendChild(stats);

    // ---- Personal deck card ----
    const deckSize = Storage.deckSize();
    const dueCount = Storage.getDueDeckCards().length;
    const deckCard = document.createElement("div");
    deckCard.className = "review-deck-card";
    deckCard.innerHTML = `
      <div>
        <h3>My SRS Deck</h3>
        <p>${deckSize} saved word${deckSize === 1 ? "" : "s"} · ${dueCount} due for review now</p>
        <p class="deck-hint">Tap any underlined Gujarati word during lessons or stories → "+ Save" to add to your personal deck.</p>
      </div>
      <button class="btn btn-primary" id="practice-btn" ${dueCount === 0 ? "disabled" : ""}>${dueCount === 0 ? (deckSize === 0 ? "Deck empty" : "Nothing due") : `Practice ${dueCount} card${dueCount === 1 ? "" : "s"} →`}</button>
    `;
    container.appendChild(deckCard);
    if (dueCount > 0) {
      deckCard.querySelector("#practice-btn").addEventListener("click", () => ReviewView.runPractice(container));
    }

    // ---- Controls ----
    const controls = document.createElement("div");
    controls.className = "review-controls-bar";
    controls.innerHTML = `
      <input type="text" class="review-search" placeholder="Search Gujarati, transliteration, or English…" />
      <label class="review-toggle"><input type="checkbox" id="only-learned" checked/> Only learned</label>
      <label class="review-toggle"><input type="checkbox" id="blur-en"/> Hide meanings (self-test)</label>
    `;
    container.appendChild(controls);

    const list = document.createElement("div");
    list.className = "review-list";
    container.appendChild(list);

    function render() {
      list.innerHTML = "";
      const q = controls.querySelector(".review-search").value.trim().toLowerCase();
      const onlyLearned = controls.querySelector("#only-learned").checked;
      const blur = controls.querySelector("#blur-en").checked;

      let source = onlyLearned ? learned : all;
      if (q) {
        source = source.filter(it =>
          it.gu.toLowerCase().includes(q) ||
          it.en.toLowerCase().includes(q) ||
          it.source.toLowerCase().includes(q)
        );
      }

      // Group by source
      const groups = new Map();
      for (const it of source) {
        if (!groups.has(it.source)) groups.set(it.source, []);
        groups.get(it.source).push(it);
      }

      if (!groups.size) {
        list.innerHTML = `<p style="color: var(--ink-muted); padding: 20px; text-align: center;">No words match "${q}".</p>`;
        return;
      }

      for (const [source, items] of groups) {
        const sec = document.createElement("section");
        sec.className = "review-group";
        sec.innerHTML = `<h3 class="review-group-title">${source} <span class="review-group-count">${items.length}</span></h3>`;

        const grid = document.createElement("div");
        grid.className = "review-grid";

        for (const it of items) {
          const card = document.createElement("button");
          card.className = "review-card";
          if (blur) card.classList.add("blurred");
          card.innerHTML = `
            <div class="rc-gu gu">${it.gu}</div>
            <div class="rc-en">${it.en}</div>
            <div class="rc-actions">
              <span class="rc-speak" title="Hear">🔊</span>
            </div>
          `;
          card.addEventListener("click", () => Speech.speak(it.gu));
          // Click to peek when blurred (reveal then re-blur)
          if (blur) {
            card.addEventListener("click", () => {
              card.classList.remove("blurred");
              setTimeout(() => card.classList.add("blurred"), 2200);
            });
          }
          grid.appendChild(card);
        }
        sec.appendChild(grid);
        list.appendChild(sec);
      }
    }

    controls.querySelector(".review-search").addEventListener("input", render);
    controls.querySelector("#only-learned").addEventListener("change", render);
    controls.querySelector("#blur-en").addEventListener("change", render);

    render();
  },

  // ===== Personal SRS practice =====
  runPractice(container) {
    const queue = Storage.getDueDeckCards();
    if (!queue.length) {
      ReviewView.render(container);
      return;
    }

    let i = 0;
    let correct = 0;

    function nextCard() {
      container.innerHTML = "";

      const back = document.createElement("div");
      back.className = "back-row";
      back.innerHTML = `<button class="back-btn">← Stop practicing</button>
                        <span class="queue-stats">${queue.length - i} left</span>`;
      back.querySelector(".back-btn").addEventListener("click", () => ReviewView.render(container));
      container.appendChild(back);

      if (i >= queue.length) {
        const done = document.createElement("div");
        done.className = "lp-finish";
        done.innerHTML = `
          <div class="lp-finish-emoji">📚</div>
          <h2>Practice session done</h2>
          <div class="lp-finish-stats">
            <div class="lp-stat"><div class="num">${queue.length}</div><div>Reviewed</div></div>
            <div class="lp-stat"><div class="num">${correct}</div><div>Got right</div></div>
            <div class="lp-stat"><div class="num">${Math.round((correct / queue.length) * 100)}%</div><div>Accuracy</div></div>
          </div>
          <div class="lp-finish-actions">
            <button class="btn btn-primary" id="back-deck">Back to Review</button>
          </div>
        `;
        done.querySelector("#back-deck").addEventListener("click", () => ReviewView.render(container));
        container.appendChild(done);
        return;
      }

      const card = queue[i];
      const stage = document.createElement("div");
      stage.className = "flashcard-stage";

      const flash = document.createElement("div");
      flash.className = "flashcard";
      flash.innerHTML = `
        <div class="front-gu">${card.gu}</div>
        <div class="hint">Tap to reveal · Click 🔊 to hear</div>
      `;
      const speak = speakButton(card.gu);
      const topSpeak = document.createElement("div");
      topSpeak.style.display = "flex";
      topSpeak.style.justifyContent = "center";
      topSpeak.style.marginBottom = "6px";
      topSpeak.appendChild(speak);
      stage.appendChild(topSpeak);
      stage.appendChild(flash);

      Speech.speak(card.gu);

      let flipped = false;
      flash.addEventListener("click", () => {
        if (flipped) return;
        flipped = true;
        const ans = document.createElement("div");
        ans.className = "answer";
        ans.textContent = card.en;
        flash.querySelector(".hint")?.remove();
        flash.appendChild(ans);
      });

      const controls = document.createElement("div");
      controls.className = "review-controls";
      controls.innerHTML = `
        <button class="btn-again">Again</button>
        <button class="btn-hard">Hard</button>
        <button class="btn-good">Good</button>
        <button class="btn-easy">Easy</button>
      `;
      function grade(q) {
        if (!flipped) {
          flash.click();
          setTimeout(() => grade(q), 400);
          return;
        }
        Storage.gradeDeckCard(card.gu, q);
        if (q > 0) correct += 1;
        i += 1;
        nextCard();
      }
      controls.querySelector(".btn-again").addEventListener("click", () => grade(0));
      controls.querySelector(".btn-hard").addEventListener("click", () => grade(1));
      controls.querySelector(".btn-good").addEventListener("click", () => grade(2));
      controls.querySelector(".btn-easy").addEventListener("click", () => grade(3));
      stage.appendChild(controls);

      container.appendChild(stage);
    }

    nextCard();
  },
};
