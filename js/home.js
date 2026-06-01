// Home / dashboard
const HomeView = {
  render(container) {
    container.innerHTML = "";

    const state = Storage.load();
    const totalVocab = Object.values(VOCAB).flat().length;
    const studiedVocab = Object.keys(state.srs).length;
    const lettersTotal = ALPHABET.vowels.length + ALPHABET.consonants.length;
    const lettersLearned = state.lettersLearned.length;
    const grammarSeen = state.grammarSeen.length;
    const grammarTotal = GRAMMAR.length;

    const hero = document.createElement("div");
    hero.className = "hero";
    hero.innerHTML = `
      <h2>${greeting()}, ready to learn?</h2>
      <p>Pick up where you left off — or jump into something new.</p>
      <button class="btn btn-primary" id="continue-btn">Continue learning →</button>
    `;
    container.appendChild(hero);
    hero.querySelector("#continue-btn").addEventListener("click", () => {
      // Smart continue: if no letters learned, alphabet; else flashcards
      if (lettersLearned < 5) switchView("alphabet");
      else switchView("flashcards");
    });

    // Stats
    const stats = document.createElement("div");
    stats.className = "stat-grid";
    stats.innerHTML = `
      <div class="stat-tile"><div class="stat-num">${lettersLearned}/${lettersTotal}</div><div class="stat-label">Letters tapped</div></div>
      <div class="stat-tile"><div class="stat-num">${studiedVocab}/${totalVocab}</div><div class="stat-label">Vocab cards</div></div>
      <div class="stat-tile"><div class="stat-num">${grammarSeen}/${grammarTotal}</div><div class="stat-label">Grammar lessons</div></div>
      <div class="stat-tile"><div class="stat-num">${state.streak}</div><div class="stat-label">Day streak</div></div>
    `;
    container.appendChild(stats);

    // Learning path
    const heading = document.createElement("h3");
    heading.className = "section-title";
    heading.textContent = "Your learning path";
    container.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "grid large";
    const path = [
      { view: "alphabet",    name: "Master the Script", desc: "Vowels, consonants, matras, numbers — all in one place." },
      { view: "flashcards",  name: "Build Vocabulary",  desc: "Spaced-repetition flashcards across five levels." },
      { view: "grammar",     name: "Learn Grammar",     desc: "10 lessons covering SOV order to advanced conditionals." },
      { view: "conversation",name: "Practice Speaking", desc: "Scripted dialogues + live AI tutor for real chat." },
    ];
    for (const p of path) {
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p>`;
      card.addEventListener("click", () => switchView(p.view));
      grid.appendChild(card);
    }
    container.appendChild(grid);

    // Today's tip
    const tip = document.createElement("div");
    tip.className = "lesson-body";
    tip.style.marginTop = "28px";
    const tips = [
      `<strong>Today's word:</strong> <span class="gu" style="font-size: 22px">શુભ સવાર</span> — <em>shubh savār</em> — "good morning"`,
      `<strong>Tip:</strong> Gujarati verbs come last. Think "I rice eat" rather than "I eat rice."`,
      `<strong>Pro tip:</strong> The retroflex ળ (ḷa) is uniquely Gujarati — neighboring languages don't all have it.`,
      `<strong>Did you know:</strong> Gujarati numerals look different from Western Arabic digits: ૧ ૨ ૩ vs 1 2 3.`,
    ];
    tip.innerHTML = `<h3>💡 Tip of the moment</h3><p style="margin-top:8px">${tips[new Date().getDate() % tips.length]}</p>`;
    container.appendChild(tip);
  },
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
