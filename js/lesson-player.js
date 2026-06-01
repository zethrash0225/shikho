// Duolingo-style lesson player (no hearts mechanic — just XP + streak).
//
// Entry point: LessonPlayer.start(container, unit, lesson)

const LessonPlayer = {
  state: null,

  start(container, unit, lesson) {
    const exercises = LessonPlayer.maybeAugmentReverse(lesson.exercises);
    LessonPlayer.state = {
      container, unit, lesson,
      exercises,
      index: 0,
      correctCount: 0,
      wrongCount: 0,
      requeue: [], // wrong exercises to retry at end
    };
    LessonPlayer.renderCurrent();
  },

  // Interleave reverse-direction production exercises after each recognition
  // exercise (mcGu / listen). Toggleable via Settings → reverseMode.
  maybeAugmentReverse(originals) {
    const s = Storage.load();
    if (s.reverseMode === false) return [...originals];

    // Collect a pool of Gujarati items from the lesson to use as distractors
    const guPool = [];
    for (const ex of originals) {
      if (ex.gu) guPool.push(ex.gu);
      if (ex.expected) guPool.push(ex.expected);
      if (ex.pairs) for (const p of ex.pairs) guPool.push(p.gu);
    }

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function reverseFor(ex) {
      // Don't reverse anything that already has _reverse set, or non-vocab types
      if (ex._reverse) return null;
      if (!ex.gu || !ex.en) return null;

      const tokens = ex.gu.split(/\s+/).filter(Boolean);

      // Multi-word: build a tap exercise (en prompt, tap gu word tiles in order)
      if (tokens.length >= 2) {
        const otherTokens = guPool
          .filter(g => g !== ex.gu)
          .flatMap(g => g.split(/\s+/))
          .filter(w => w && !tokens.includes(w));
        const distractors = shuffle(otherTokens).slice(0, Math.min(3, Math.max(1, otherTokens.length)));
        return {
          type: "tap",
          en: ex.en,
          gu: ex.gu,
          tokens,
          bank: shuffle([...tokens, ...distractors]),
          _reverse: true,
        };
      }

      // Single-word: build an mcEn (en prompt, pick gu from 4 options)
      const others = guPool.filter(g => g !== ex.gu && g.split(/\s+/).length === 1);
      const distractors = shuffle(others).slice(0, 3);
      if (distractors.length < 1) return null;
      return {
        type: "mcEn",
        en: ex.en,
        gu: ex.gu,
        choices: shuffle([ex.gu, ...distractors]).slice(0, 4),
        _reverse: true,
      };
    }

    const out = [];
    for (const ex of originals) {
      out.push(ex);
      // Generate reverse for recognition-only types
      if (ex.type === "mcGu" || ex.type === "listen") {
        const rev = reverseFor(ex);
        if (rev) out.push(rev);
      }
    }
    return out;
  },

  renderCurrent() {
    const st = LessonPlayer.state;
    const { container, exercises, index } = st;
    container.innerHTML = "";

    // ---- Header bar (close, progress) ----
    const header = document.createElement("div");
    header.className = "lp-header";

    const close = document.createElement("button");
    close.className = "lp-close";
    close.innerHTML = "✕";
    close.title = "Quit lesson";
    close.addEventListener("click", () => {
      if (confirm("Quit this lesson? Progress won't be saved.")) switchView("home");
    });
    header.appendChild(close);

    const bar = document.createElement("div");
    bar.className = "lp-progress";
    const total = exercises.length + st.requeue.length;
    const done = index;
    bar.innerHTML = `<span style="width:${Math.min(100, (done / Math.max(total, 1)) * 100)}%"></span>`;
    header.appendChild(bar);

    container.appendChild(header);

    // ---- Exercise body ----
    if (index >= exercises.length) {
      if (st.requeue.length > 0) {
        st.exercises = st.exercises.concat(st.requeue);
        st.requeue = [];
        LessonPlayer.renderCurrent();
        return;
      }
      LessonPlayer.finish();
      return;
    }

    const ex = exercises[index];
    const stage = document.createElement("div");
    stage.className = "lp-stage";
    container.appendChild(stage);

    const handler = LessonPlayer.handlers[ex.type];
    if (!handler) {
      stage.innerHTML = `<p>Unknown exercise type: ${ex.type}</p>`;
      LessonPlayer.advance();
      return;
    }
    handler(stage, ex);
  },

  // Called by each exercise handler when the user submits an answer.
  submitAnswer(correct, exercise, feedbackHtml) {
    const st = LessonPlayer.state;
    if (correct) st.correctCount += 1;
    else { st.wrongCount += 1; st.requeue.push(exercise); }
    LessonPlayer.showFeedback(correct, exercise, feedbackHtml);
  },

  showFeedback(correct, exercise, feedbackHtml) {
    const st = LessonPlayer.state;
    const fb = document.createElement("div");
    fb.className = `lp-feedback ${correct ? "good" : "bad"}`;
    fb.innerHTML = `
      <div class="lp-feedback-content">
        <div class="lp-feedback-title">${correct ? "Nice! ✓" : "Not quite"}</div>
        ${feedbackHtml || ""}
      </div>
      <button class="btn lp-continue">${correct ? "Continue" : "Got it"}</button>
    `;
    fb.querySelector(".lp-continue").addEventListener("click", () => LessonPlayer.advance());
    st.container.appendChild(fb);

    if (exercise && exercise.gu && correct) Speech.speak(exercise.gu);
  },

  advance() {
    LessonPlayer.state.index += 1;
    LessonPlayer.renderCurrent();
  },

  finish() {
    const st = LessonPlayer.state;
    // XP: 10 base + 2 per correct - 1 per wrong, min 5
    const xp = Math.max(5, 10 + st.correctCount * 2 - st.wrongCount);
    Storage.completeLesson(st.lesson.id, xp);

    st.container.innerHTML = "";
    const card = document.createElement("div");
    card.className = "lp-finish";
    const accuracy = Math.round((st.correctCount / Math.max(1, st.correctCount + st.wrongCount)) * 100);
    card.innerHTML = `
      <div class="lp-finish-emoji">🎉</div>
      <h2>Lesson complete!</h2>
      <div class="lp-finish-stats">
        <div class="lp-stat"><div class="num">+${xp}</div><div>XP</div></div>
        <div class="lp-stat"><div class="num">${accuracy}%</div><div>Accuracy</div></div>
        <div class="lp-stat"><div class="num">${Storage.load().streak} 🔥</div><div>Streak</div></div>
      </div>
      <div class="lp-finish-actions">
        <button class="btn btn-primary" id="lp-continue">Continue</button>
        <button class="btn" id="lp-replay">Replay</button>
      </div>
    `;
    card.querySelector("#lp-continue").addEventListener("click", () => switchView("home"));
    card.querySelector("#lp-replay").addEventListener("click", () => LessonPlayer.start(st.container, st.unit, st.lesson));
    st.container.appendChild(card);
  },

  // ===== EXERCISE TYPE HANDLERS =====
  handlers: {

    mcGu(stage, ex) {
      stage.innerHTML = `<div class="lp-prompt">What does this mean? <span class="lp-hint-tip">(tap any underlined word for a hint)</span></div>`;
      const guDiv = document.createElement("div");
      guDiv.className = "lp-gu-large";
      guDiv.appendChild(GuDict.renderHintable(ex.gu));
      stage.appendChild(guDiv);
      const speak = speakButton(ex.gu);
      speak.style.margin = "0 auto 16px";
      stage.appendChild(speak);
      Speech.speak(ex.gu);

      const choices = document.createElement("div");
      choices.className = "lp-choices";
      for (const c of ex.choices) {
        const btn = document.createElement("button");
        btn.className = "lp-choice";
        btn.textContent = c;
        btn.addEventListener("click", () => {
          [...choices.querySelectorAll(".lp-choice")].forEach(b => b.disabled = true);
          const ok = c === ex.en;
          btn.classList.add(ok ? "correct" : "wrong");
          if (!ok) [...choices.querySelectorAll(".lp-choice")].find(b => b.textContent === ex.en)?.classList.add("correct");
          LessonPlayer.submitAnswer(ok, ex, ok ? "" : `<div>Correct answer: <strong>${ex.en}</strong></div>`);
        });
        choices.appendChild(btn);
      }
      stage.appendChild(choices);
    },

    mcEn(stage, ex) {
      stage.innerHTML = `
        <div class="lp-prompt">Translate this</div>
        <div class="lp-en-large">${ex.en}</div>
      `;
      const choices = document.createElement("div");
      choices.className = "lp-choices";
      for (const c of ex.choices) {
        const btn = document.createElement("button");
        btn.className = "lp-choice gu";
        btn.textContent = c;
        btn.addEventListener("click", () => {
          [...choices.querySelectorAll(".lp-choice")].forEach(b => b.disabled = true);
          const ok = c === ex.gu;
          btn.classList.add(ok ? "correct" : "wrong");
          if (!ok) [...choices.querySelectorAll(".lp-choice")].find(b => b.textContent === ex.gu)?.classList.add("correct");
          LessonPlayer.submitAnswer(ok, ex, ok ? "" : `<div>Correct: <strong class="gujarati">${ex.gu}</strong></div>`);
        });
        choices.appendChild(btn);
      }
      stage.appendChild(choices);
    },

    listen(stage, ex) {
      stage.innerHTML = `<div class="lp-prompt">What did you hear?</div>`;
      const big = document.createElement("button");
      big.className = "lp-listen-btn";
      big.innerHTML = "🔊 Play";
      big.addEventListener("click", () => Speech.speak(ex.gu));
      stage.appendChild(big);
      Speech.speak(ex.gu);

      const choices = document.createElement("div");
      choices.className = "lp-choices";
      for (const c of ex.choices) {
        const btn = document.createElement("button");
        btn.className = "lp-choice gu";
        btn.textContent = c;
        btn.addEventListener("click", () => {
          [...choices.querySelectorAll(".lp-choice")].forEach(b => b.disabled = true);
          const ok = c === ex.gu;
          btn.classList.add(ok ? "correct" : "wrong");
          if (!ok) [...choices.querySelectorAll(".lp-choice")].find(b => b.textContent === ex.gu)?.classList.add("correct");
          LessonPlayer.submitAnswer(ok, ex, ok
            ? `<div class="gujarati">${ex.gu}</div><div>${ex.en}</div>`
            : `<div>You heard: <strong class="gujarati">${ex.gu}</strong> — ${ex.en}</div>`);
        });
        choices.appendChild(btn);
      }
      stage.appendChild(choices);
    },

    tap(stage, ex) {
      stage.innerHTML = `<div class="lp-prompt">Translate this sentence</div><div class="lp-en-large">${ex.en}</div>`;

      const answer = document.createElement("div");
      answer.className = "lp-tap-answer";
      stage.appendChild(answer);

      const bank = document.createElement("div");
      bank.className = "lp-tap-bank";
      stage.appendChild(bank);

      const bankTokens = ex.bank.map((w, i) => ({ w, i, used: false }));

      function renderBank() {
        bank.innerHTML = "";
        for (const t of bankTokens) {
          const tile = document.createElement("button");
          tile.className = "lp-tile gu";
          tile.textContent = t.w;
          if (t.used) tile.classList.add("hidden");
          tile.addEventListener("click", () => {
            if (t.used) return;
            t.used = true;
            const ansTile = document.createElement("button");
            ansTile.className = "lp-tile gu";
            ansTile.textContent = t.w;
            ansTile.dataset.tokenIdx = t.i;
            ansTile.addEventListener("click", () => {
              t.used = false;
              ansTile.remove();
              renderBank();
            });
            answer.appendChild(ansTile);
            renderBank();
          });
          bank.appendChild(tile);
        }
      }
      renderBank();

      const submit = document.createElement("button");
      submit.className = "btn btn-primary lp-submit";
      submit.textContent = "Check";
      submit.addEventListener("click", () => {
        const picked = [...answer.querySelectorAll(".lp-tile")].map(t => t.textContent);
        const expected = ex.tokens;
        const ok = picked.length === expected.length && picked.every((w, i) => w === expected[i]);
        submit.disabled = true;
        LessonPlayer.submitAnswer(ok, ex, ok
          ? `<div class="gujarati">${ex.gu}</div>`
          : `<div>Correct: <strong class="gujarati">${expected.join(" ")}</strong></div>`);
      });
      stage.appendChild(submit);
    },

    type(stage, ex) {
      stage.innerHTML = `<div class="lp-prompt">Type this in Gujarati</div><div class="lp-en-large">${ex.en}</div>`;

      const ta = document.createElement("textarea");
      ta.className = "writing-input";
      ta.placeholder = "ગુજરાતીમાં લખો…";
      ta.rows = 2;
      stage.appendChild(ta);

      const kb = makeKeyboard(ta);
      stage.appendChild(kb);

      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.gap = "10px";
      row.style.marginTop = "12px";
      row.innerHTML = `
        <button class="btn btn-primary" id="t-check">Check</button>
        <button class="btn" id="t-skip">I don't know</button>
      `;
      stage.appendChild(row);

      const norm = s => s.replace(/[\s।.!?,]+/g, "").trim();
      const accept = ex.accept.map(norm);

      row.querySelector("#t-check").addEventListener("click", () => {
        const v = ta.value.trim();
        const ok = accept.includes(norm(v));
        row.querySelector("#t-check").disabled = true;
        LessonPlayer.submitAnswer(ok, ex, ok
          ? `<div class="gujarati">${ex.expected}</div>`
          : `<div>Correct: <strong class="gujarati">${ex.expected}</strong></div>`);
      });
      row.querySelector("#t-skip").addEventListener("click", () => {
        row.querySelector("#t-check").disabled = true;
        LessonPlayer.submitAnswer(false, ex, `<div>The answer was: <strong class="gujarati">${ex.expected}</strong></div>`);
      });
    },

    match(stage, ex) {
      stage.innerHTML = `<div class="lp-prompt">Tap matching pairs</div>`;

      const left = ex.pairs.map((p, i) => ({ side: "L", text: p.gu, pairIdx: i }));
      const right = ex.pairs.map((p, i) => ({ side: "R", text: p.en, pairIdx: i }));
      const leftCol  = shuffleInPlaceLP([...left]);
      const rightCol = shuffleInPlaceLP([...right]);

      const matchGrid = document.createElement("div");
      matchGrid.className = "lp-match-grid";
      stage.appendChild(matchGrid);

      const colL = document.createElement("div"); colL.className = "lp-match-col";
      const colR = document.createElement("div"); colR.className = "lp-match-col";
      matchGrid.appendChild(colL); matchGrid.appendChild(colR);

      let selected = null;
      let matched = 0;
      let mistakes = 0;

      function makeTile(t) {
        const btn = document.createElement("button");
        btn.className = "lp-match-tile" + (t.side === "L" ? " gu" : "");
        btn.textContent = t.text;
        btn.dataset.pair = t.pairIdx;
        btn.dataset.side = t.side;
        btn.addEventListener("click", () => {
          if (btn.classList.contains("done")) return;
          if (selected === btn) { btn.classList.remove("selected"); selected = null; return; }
          if (!selected) { btn.classList.add("selected"); selected = btn; return; }
          if (selected.dataset.side === btn.dataset.side) {
            selected.classList.remove("selected"); selected = btn; btn.classList.add("selected"); return;
          }
          if (selected.dataset.pair === btn.dataset.pair) {
            selected.classList.remove("selected");
            selected.classList.add("done");
            btn.classList.add("done");
            matched += 1;
            const guTile = selected.dataset.side === "L" ? selected : btn;
            Speech.speak(guTile.textContent);
            selected = null;
            if (matched === ex.pairs.length) {
              setTimeout(() => LessonPlayer.submitAnswer(mistakes <= 1, ex, mistakes <= 1
                ? "All matched!" : `${mistakes} mismatches — review these.`), 400);
            }
          } else {
            selected.classList.remove("selected");
            selected.classList.add("wrong");
            btn.classList.add("wrong");
            const a = selected, b = btn;
            setTimeout(() => { a.classList.remove("wrong"); b.classList.remove("wrong"); }, 600);
            mistakes += 1;
            selected = null;
          }
        });
        return btn;
      }
      for (const t of leftCol)  colL.appendChild(makeTile(t));
      for (const t of rightCol) colR.appendChild(makeTile(t));
    },

    fill(stage, ex) {
      stage.innerHTML = `<div class="lp-prompt">Fill in the blank <span class="lp-hint-tip">(tap any underlined word for a hint)</span></div>`;
      const guDiv = document.createElement("div");
      guDiv.className = "lp-gu-large";
      const parts = ex.template.split("__");
      for (let i = 0; i < parts.length; i++) {
        if (parts[i]) guDiv.appendChild(GuDict.renderHintable(parts[i]));
        if (i < parts.length - 1) {
          const blank = document.createElement("span");
          blank.className = "lp-blank";
          blank.textContent = "_____";
          guDiv.appendChild(blank);
        }
      }
      stage.appendChild(guDiv);
      const enSmall = document.createElement("div");
      enSmall.className = "lp-en-small";
      enSmall.textContent = ex.en || "";
      stage.appendChild(enSmall);

      const choices = document.createElement("div");
      choices.className = "lp-choices";
      for (const c of ex.choices) {
        const btn = document.createElement("button");
        btn.className = "lp-choice gu";
        btn.textContent = c;
        btn.addEventListener("click", () => {
          [...choices.querySelectorAll(".lp-choice")].forEach(b => b.disabled = true);
          const ok = c === ex.correct;
          btn.classList.add(ok ? "correct" : "wrong");
          if (!ok) [...choices.querySelectorAll(".lp-choice")].find(b => b.textContent === ex.correct)?.classList.add("correct");
          LessonPlayer.submitAnswer(ok, ex, ok
            ? `<div class="gujarati">${ex.template.replace("__", ex.correct)}</div>`
            : `<div>Correct: <strong class="gujarati">${ex.template.replace("__", ex.correct)}</strong></div>`);
        });
        choices.appendChild(btn);
      }
      stage.appendChild(choices);
    },

  },
};

function shuffleInPlaceLP(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
