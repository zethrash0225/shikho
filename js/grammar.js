// Grammar lessons view
const GrammarView = {
  render(container) {
    container.innerHTML = "";

    const header = document.createElement("div");
    header.className = "view-header";
    header.innerHTML = `
      <h2>Grammar Lessons</h2>
      <p>Bite-sized lessons that build up from sentence basics to advanced conditionals and register.</p>
    `;
    container.appendChild(header);

    const state = Storage.load();
    const byLevel = {};
    for (const l of GRAMMAR) {
      (byLevel[l.level] ||= []).push(l);
    }

    for (const level of Object.keys(byLevel).sort()) {
      const h = document.createElement("h3");
      h.className = "section-title";
      h.textContent = `Level ${level}`;
      container.appendChild(h);

      const grid = document.createElement("div");
      grid.className = "grid large";
      for (const lesson of byLevel[level]) {
        const seen = state.grammarSeen.includes(lesson.id);
        const card = document.createElement("div");
        card.className = "lesson-card";
        card.innerHTML = `
          <span class="level-badge">${seen ? "Reviewed" : "New"}</span>
          <h3>${lesson.title}</h3>
          <p>${lesson.examples.length} examples · 1 writing prompt</p>
        `;
        card.addEventListener("click", () => GrammarView.openLesson(container, lesson));
        grid.appendChild(card);
      }
      container.appendChild(grid);
    }
  },

  openLesson(container, lesson) {
    container.innerHTML = "";

    const back = document.createElement("div");
    back.className = "back-row";
    back.innerHTML = `<button class="back-btn">← All lessons</button>`;
    back.querySelector(".back-btn").addEventListener("click", () => GrammarView.render(container));
    container.appendChild(back);

    const body = document.createElement("div");
    body.className = "lesson-body";

    body.innerHTML = `
      <span class="level-badge">Level ${lesson.level}</span>
      <h3>${lesson.title}</h3>
      <div class="body-text">${lesson.body}</div>
      <div class="section-title" style="margin-top:24px">Examples</div>
    `;

    for (const ex of lesson.examples) {
      const row = document.createElement("div");
      row.className = "example-row";
      row.innerHTML = `
        <div class="ex-gu">${ex.gu}</div>
        <div class="ex-tr">${ex.translit}</div>
        <div class="ex-en">${ex.en}</div>
      `;
      const sb = speakButton(ex.gu);
      row.appendChild(sb);
      body.appendChild(row);
    }

    // Writing prompt
    const prompt = document.createElement("div");
    prompt.className = "writing-prompt";
    prompt.innerHTML = `
      <h4>Try it — type in Gujarati</h4>
      <div class="prompt-en">${lesson.prompt.en}</div>
    `;
    const textarea = document.createElement("textarea");
    textarea.className = "writing-input";
    textarea.placeholder = "ગુજરાતીમાં લખો…";
    prompt.appendChild(textarea);

    // Keyboard
    const kb = makeKeyboard(textarea);
    prompt.appendChild(kb);

    const buttons = document.createElement("div");
    buttons.style.display = "flex";
    buttons.style.gap = "10px";
    buttons.style.marginTop = "14px";
    buttons.innerHTML = `
      <button class="btn btn-primary" id="check-btn">Check</button>
      <button class="btn" id="show-btn">Show answer</button>
      <button class="btn" id="hear-btn">🔊 Hear answer</button>
    `;
    prompt.appendChild(buttons);

    const feedback = document.createElement("div");
    feedback.className = "writing-feedback";
    prompt.appendChild(feedback);

    buttons.querySelector("#check-btn").addEventListener("click", () => {
      const v = textarea.value.trim();
      const expected = lesson.prompt.expected.trim();
      if (v === expected) {
        feedback.className = "writing-feedback correct";
        feedback.textContent = `✓ Perfect! "${expected}"`;
      } else if (normalize(v) === normalize(expected)) {
        feedback.className = "writing-feedback correct";
        feedback.textContent = `✓ Close enough! Expected: "${expected}"`;
      } else {
        feedback.className = "writing-feedback incorrect";
        feedback.textContent = `Not quite. Expected: "${expected}"`;
      }
    });

    buttons.querySelector("#show-btn").addEventListener("click", () => {
      textarea.value = lesson.prompt.expected;
    });

    buttons.querySelector("#hear-btn").addEventListener("click", () => {
      Speech.speak(lesson.prompt.expected);
    });

    body.appendChild(prompt);
    container.appendChild(body);

    // Mark seen
    const state = Storage.load();
    if (!state.grammarSeen.includes(lesson.id)) {
      state.grammarSeen.push(lesson.id);
      Storage.save(state);
    }
    Storage.markStudiedToday();
  },
};

function normalize(s) {
  return s.replace(/\s+/g, "").replace(/[।.!?,]/g, "");
}
