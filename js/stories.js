// Stories view — paragraph-level reading practice with toggleable translation,
// tappable vocab gloss, and comprehension questions.
const StoriesView = {
  render(container) {
    container.innerHTML = "";

    const header = document.createElement("div");
    header.className = "view-header";
    header.innerHTML = `
      <h2>Stories</h2>
      <p>Read graded passages from A2 to B2. Tap any sentence to hear it, toggle translations on/off, answer comprehension questions.</p>
    `;
    container.appendChild(header);

    const state = Storage.load();
    const grid = document.createElement("div");
    grid.className = "grid large";

    for (const s of STORIES) {
      const done = (state.storiesRead || []).includes(s.id);
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.innerHTML = `
        <span class="level-badge">${s.cefr}${done ? " · ✓" : ""}</span>
        <h3 class="gu">${s.title}</h3>
        <p>${s.titleEn} · ${s.text.length} sentences · ${s.questions.length} questions</p>
      `;
      card.addEventListener("click", () => StoriesView.openStory(container, s));
      grid.appendChild(card);
    }
    container.appendChild(grid);
  },

  openStory(container, story) {
    container.innerHTML = "";

    const back = document.createElement("div");
    back.className = "back-row";
    back.innerHTML = `<button class="back-btn">← All stories</button>`;
    back.querySelector(".back-btn").addEventListener("click", () => StoriesView.render(container));
    container.appendChild(back);

    const head = document.createElement("div");
    head.className = "view-header";
    head.innerHTML = `<h2 class="gu">${story.title}</h2><p>${story.titleEn} · ${story.cefr}</p>`;
    container.appendChild(head);

    // Toolbar — translation toggle, read all
    const toolbar = document.createElement("div");
    toolbar.className = "story-toolbar";
    toolbar.innerHTML = `
      <label class="toolbar-toggle"><input type="checkbox" id="show-tr"> Show English</label>
      <button class="btn" id="read-all">🔊 Read whole story</button>
    `;
    container.appendChild(toolbar);

    // Body
    const body = document.createElement("div");
    body.className = "lesson-body story-body";
    container.appendChild(body);

    for (let i = 0; i < story.text.length; i++) {
      const para = document.createElement("div");
      para.className = "story-sentence";

      // Shadow toolbar: 🔊 + 🎤 + ▶
      const tools = Shadow.makeToolbar(story.text[i], `${story.id}_s${i}`);
      tools.classList.add("story-tools");
      para.appendChild(tools);

      // Hintable Gujarati line
      const guLine = document.createElement("div");
      guLine.className = "story-gu gu";
      guLine.appendChild(GuDict.renderHintable(story.text[i]));
      para.appendChild(guLine);

      // English line
      const enLine = document.createElement("div");
      enLine.className = "story-en";
      enLine.textContent = story.translations[i];
      para.appendChild(enLine);

      body.appendChild(para);
    }

    const hintNote = document.createElement("p");
    hintNote.className = "story-hint-note";
    hintNote.innerHTML = `<strong>Tip:</strong> tap any underlined Gujarati word for its meaning. Tap 🎤 to record yourself, then ▶ to play back and compare. Recordings stay only in this browser session.`;
    body.appendChild(hintNote);

    // Vocab gloss
    if (story.gloss && story.gloss.length) {
      const glossHead = document.createElement("h3");
      glossHead.className = "section-title";
      glossHead.textContent = "Key vocabulary";
      container.appendChild(glossHead);

      const glossGrid = document.createElement("div");
      glossGrid.className = "story-gloss-grid";
      for (const g of story.gloss) {
        const item = document.createElement("button");
        item.className = "story-gloss-item";
        item.innerHTML = `<span class="gu">${g.gu}</span><span class="gloss-en">${g.en}</span>`;
        item.addEventListener("click", () => Speech.speak(g.gu));
        glossGrid.appendChild(item);
      }
      container.appendChild(glossGrid);
    }

    // Quiz button
    const startQuiz = document.createElement("div");
    startQuiz.style.marginTop = "24px";
    startQuiz.innerHTML = `<button class="btn btn-primary" id="quiz-btn">Take comprehension quiz →</button>`;
    container.appendChild(startQuiz);
    startQuiz.querySelector("#quiz-btn").addEventListener("click", () => StoriesView.runQuiz(container, story));

    // Wire toolbar
    const trToggle = toolbar.querySelector("#show-tr");
    const sync = () => body.classList.toggle("show-tr", trToggle.checked);
    trToggle.addEventListener("change", sync);
    sync();

    toolbar.querySelector("#read-all").addEventListener("click", async () => {
      for (const s of story.text) {
        Speech.stop();
        await Speech.speak(s);
      }
    });

    // Mark as read
    const state = Storage.load();
    state.storiesRead = state.storiesRead || [];
    if (!state.storiesRead.includes(story.id)) {
      state.storiesRead.push(story.id);
      Storage.save(state);
    }
    Storage.markStudiedToday();
  },

  runQuiz(container, story) {
    container.innerHTML = "";
    const back = document.createElement("div");
    back.className = "back-row";
    back.innerHTML = `<button class="back-btn">← Back to story</button>`;
    back.querySelector(".back-btn").addEventListener("click", () => StoriesView.openStory(container, story));
    container.appendChild(back);

    const head = document.createElement("div");
    head.className = "view-header";
    head.innerHTML = `<h2>Quiz — ${story.titleEn}</h2><p>Answer ${story.questions.length} questions about the story.</p>`;
    container.appendChild(head);

    let qi = 0;
    let correct = 0;

    const stage = document.createElement("div");
    stage.className = "lesson-body";
    container.appendChild(stage);

    function renderQ() {
      stage.innerHTML = "";
      if (qi >= story.questions.length) {
        const pct = Math.round((correct / story.questions.length) * 100);
        const xp = 5 + correct * 3;
        Storage.completeLesson("story_" + story.id, xp);
        stage.innerHTML = `
          <div class="lp-finish-emoji" style="text-align:center;font-size:54px">📖</div>
          <h3 style="text-align:center">${correct}/${story.questions.length} correct (${pct}%) · +${xp} XP</h3>
          <div style="text-align:center;margin-top:18px">
            <button class="btn btn-primary" id="back-stories">Back to stories</button>
          </div>
        `;
        stage.querySelector("#back-stories").addEventListener("click", () => StoriesView.render(container));
        return;
      }

      const q = story.questions[qi];
      const wrap = document.createElement("div");
      wrap.innerHTML = `
        <div class="lp-prompt">Question ${qi + 1} of ${story.questions.length}</div>
        <div class="lp-en-large">${q.q}</div>
      `;
      const choices = document.createElement("div");
      choices.className = "lp-choices";
      const shuffled = [...q.choices].sort(() => Math.random() - 0.5);
      for (const c of shuffled) {
        const btn = document.createElement("button");
        btn.className = "lp-choice";
        btn.textContent = c;
        btn.addEventListener("click", () => {
          [...choices.querySelectorAll(".lp-choice")].forEach(b => b.disabled = true);
          const ok = c === q.correct;
          btn.classList.add(ok ? "correct" : "wrong");
          if (!ok) [...choices.querySelectorAll(".lp-choice")].find(b => b.textContent === q.correct)?.classList.add("correct");
          if (ok) correct += 1;

          const next = document.createElement("button");
          next.className = "btn btn-primary";
          next.style.marginTop = "16px";
          next.textContent = qi === story.questions.length - 1 ? "Finish" : "Next →";
          next.addEventListener("click", () => { qi += 1; renderQ(); });
          wrap.appendChild(next);
        });
        choices.appendChild(btn);
      }
      wrap.appendChild(choices);
      stage.appendChild(wrap);
    }

    renderQ();
  },
};
