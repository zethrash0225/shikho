// Skill tree home — Duolingo-style learning path.
// Vertical zigzag of "skill bubbles" grouped by unit.
// Unlock rule: lesson N+1 unlocks when lesson N is completed.
//             unit U+1 unlocks when at least one lesson of U is completed.

const PathView = {
  render(container) {
    Storage.regenHearts();
    container.innerHTML = "";

    const state = Storage.load();

    // ---- Top status banner ----
    const status = document.createElement("div");
    status.className = "path-status";
    const lessonsDone = state.completedLessons.length;
    const lessonsTotal = UNITS.reduce((n, u) => n + u.lessons.length, 0);
    status.innerHTML = `
      <div class="path-stat"><div class="path-stat-num">${state.xp}</div><div class="path-stat-label">XP</div></div>
      <div class="path-stat"><div class="path-stat-num">${state.streak} 🔥</div><div class="path-stat-label">Day streak</div></div>
      <div class="path-stat"><div class="path-stat-num">${lessonsDone}/${lessonsTotal}</div><div class="path-stat-label">Lessons</div></div>
    `;
    container.appendChild(status);

    // ---- Hero card ----
    const next = PathView.findNextLesson(state);
    const hero = document.createElement("div");
    hero.className = "path-hero";
    if (next) {
      hero.innerHTML = `
        <div class="path-hero-text">
          <div class="path-hero-eyebrow">Continue learning</div>
          <h2>${next.unit.title} · ${next.lesson.title}</h2>
          <p>${next.unit.cefr} · ${next.lesson.exercises.length} exercises</p>
        </div>
        <button class="btn btn-primary" id="continue-btn">Start →</button>
      `;
      hero.querySelector("#continue-btn").addEventListener("click", () => PathView.openLesson(next.unit, next.lesson));
    } else {
      hero.innerHTML = `
        <div class="path-hero-text">
          <div class="path-hero-eyebrow">🎉 All lessons complete!</div>
          <h2>You finished the curriculum.</h2>
          <p>Review any unit below, or jump into the AI tutor for free conversation.</p>
        </div>
      `;
    }
    container.appendChild(hero);

    // ---- Unit list ----
    let firstNextSeen = false;
    for (const unit of UNITS) {
      const unitBlock = PathView.renderUnit(unit, state, firstNextSeen ? null : next);
      if (next && unit.id === next.unit.id) firstNextSeen = true;
      container.appendChild(unitBlock);
    }
  },

  renderUnit(unit, state, highlight) {
    const block = document.createElement("section");
    block.className = "path-unit";
    block.style.setProperty("--unit-color", unit.color);

    // Find unit position
    const idx = UNITS.findIndex(u => u.id === unit.id);
    const prevUnit = idx > 0 ? UNITS[idx - 1] : null;
    const prevUnitOk = !prevUnit || prevUnit.lessons.some(l => state.completedLessons.includes(l.id));

    const header = document.createElement("div");
    header.className = "path-unit-header";
    header.innerHTML = `
      <div class="path-unit-icon">${unit.icon}</div>
      <div>
        <div class="path-unit-eyebrow">Unit ${idx + 1} · ${unit.cefr}</div>
        <h3>${unit.title}</h3>
        <p>${unit.description}</p>
      </div>
    `;
    block.appendChild(header);

    if (!prevUnitOk) {
      const locked = document.createElement("div");
      locked.className = "path-unit-locked";
      locked.innerHTML = `🔒 Finish at least one lesson in "${prevUnit.title}" to unlock this unit.`;
      block.appendChild(locked);
      return block;
    }

    const tree = document.createElement("div");
    tree.className = "path-tree";

    for (let i = 0; i < unit.lessons.length; i++) {
      const lesson = unit.lessons[i];
      const completed = state.completedLessons.includes(lesson.id);
      const prevDone = i === 0 || state.completedLessons.includes(unit.lessons[i - 1].id);
      const locked = !prevDone;
      const isNext = !completed && !locked;

      const node = document.createElement("button");
      const sideClass = i % 2 === 0 ? "left" : (i % 4 === 1 ? "center" : "right");
      node.className = `path-node ${sideClass} ${completed ? "done" : locked ? "locked" : "open"}`;
      if (highlight && lesson.id === highlight.lesson.id && unit.id === highlight.unit.id) {
        node.classList.add("highlight");
      }
      node.innerHTML = `
        <div class="path-node-bubble">${completed ? "★" : locked ? "🔒" : (i + 1)}</div>
        <div class="path-node-label">${lesson.title}</div>
      `;
      if (!locked) {
        node.addEventListener("click", () => PathView.openLesson(unit, lesson));
      }
      tree.appendChild(node);
    }
    block.appendChild(tree);
    return block;
  },

  findNextLesson(state) {
    for (const unit of UNITS) {
      for (const lesson of unit.lessons) {
        if (!state.completedLessons.includes(lesson.id)) return { unit, lesson };
      }
    }
    return null;
  },

  openLesson(unit, lesson) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    const main = document.getElementById("main");
    LessonPlayer.start(main, unit, lesson);
  },
};
