// localStorage wrapper. State shape covers SRS, streak, Duolingo-style XP/hearts,
// completed lessons, and user prefs.
const STORAGE_KEY = "shikho_state_v2";

const Storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Migrate from v1 if present
        const old = localStorage.getItem("shikho_state_v1");
        if (old) {
          const parsed = JSON.parse(old);
          return { ...Storage.defaults(), ...parsed };
        }
        return Storage.defaults();
      }
      const parsed = JSON.parse(raw);
      return { ...Storage.defaults(), ...parsed };
    } catch (e) {
      return Storage.defaults();
    }
  },

  save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  defaults() {
    return {
      // Duolingo-style
      xp: 0,
      hearts: 5,
      lastHeartRegenTime: Date.now(),
      maxHearts: 5,
      gems: 0,
      completedLessons: [],     // [lessonId, lessonId, ...]
      lessonAttempts: {},        // { lessonId: { attempts, bestXp } }

      // Legacy / cross-feature
      srs: {},
      lettersLearned: [],
      grammarSeen: [],
      dialoguesDone: [],
      lastStudyDate: null,
      streak: 0,
      totalReviews: 0,
      correctReviews: 0,

      // Settings
      preferredVoiceURI: null,
      apiKey: "",
      showTransliteration: true,
    };
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("shikho_state_v1");
  },

  // ---- Streak ----
  markStudiedToday() {
    const state = Storage.load();
    const today = new Date().toISOString().slice(0, 10);
    if (state.lastStudyDate === today) return state;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
    state.lastStudyDate = today;
    Storage.save(state);
    return state;
  },

  // ---- Hearts (regen 1 every 30 minutes) ----
  HEART_REGEN_MS: 30 * 60 * 1000,

  regenHearts() {
    const state = Storage.load();
    if (state.hearts >= state.maxHearts) {
      // Already full — don't touch storage, would trigger save side-effects
      return state;
    }
    const elapsed = Date.now() - (state.lastHeartRegenTime || Date.now());
    const gained = Math.floor(elapsed / Storage.HEART_REGEN_MS);
    if (gained > 0) {
      state.hearts = Math.min(state.maxHearts, state.hearts + gained);
      state.lastHeartRegenTime = (state.lastHeartRegenTime || Date.now()) + gained * Storage.HEART_REGEN_MS;
      Storage.save(state);
    }
    return state;
  },

  loseHeart() {
    const state = Storage.load();
    state.hearts = Math.max(0, state.hearts - 1);
    if (state.hearts < state.maxHearts) {
      state.lastHeartRegenTime = state.lastHeartRegenTime || Date.now();
    }
    Storage.save(state);
    return state;
  },

  refillHearts() {
    const state = Storage.load();
    state.hearts = state.maxHearts;
    state.lastHeartRegenTime = Date.now();
    Storage.save(state);
    return state;
  },

  timeToNextHeart() {
    const state = Storage.load();
    if (state.hearts >= state.maxHearts) return 0;
    const elapsed = Date.now() - (state.lastHeartRegenTime || Date.now());
    return Math.max(0, Storage.HEART_REGEN_MS - elapsed);
  },

  // ---- XP & lesson completion ----
  completeLesson(lessonId, xpEarned) {
    const state = Storage.load();
    state.xp += xpEarned;
    state.gems += 1; // small reward
    if (!state.completedLessons.includes(lessonId)) state.completedLessons.push(lessonId);
    state.lessonAttempts[lessonId] = state.lessonAttempts[lessonId] || { attempts: 0, bestXp: 0 };
    state.lessonAttempts[lessonId].attempts += 1;
    state.lessonAttempts[lessonId].bestXp = Math.max(state.lessonAttempts[lessonId].bestXp, xpEarned);
    Storage.save(state);
    Storage.markStudiedToday();
    return state;
  },

  // ---- SRS (still used by review mode) ----
  scheduleReview(cardId, quality) {
    const state = Storage.load();
    const now = Date.now();
    const card = state.srs[cardId] || { ease: 2.5, interval: 0, due: now, reps: 0 };

    if (quality === 0) {
      card.reps = 0;
      card.interval = 0;
      card.ease = Math.max(1.3, card.ease - 0.2);
    } else {
      card.reps += 1;
      if (card.reps === 1) card.interval = quality === 3 ? 3 : 1;
      else if (card.reps === 2) card.interval = quality === 3 ? 6 : 3;
      else card.interval = Math.round(card.interval * card.ease * (quality === 1 ? 0.7 : quality === 3 ? 1.3 : 1.0));
      if (quality === 1) card.ease = Math.max(1.3, card.ease - 0.15);
      else if (quality === 3) card.ease += 0.1;
    }
    card.due = now + card.interval * 86400000;
    state.srs[cardId] = card;
    state.totalReviews += 1;
    if (quality > 0) state.correctReviews += 1;
    Storage.save(state);
    return card;
  },

  getDueCards(allCards, max = 20) {
    const state = Storage.load();
    const now = Date.now();
    const due = [], fresh = [];
    for (const c of allCards) {
      const entry = state.srs[c.id];
      if (!entry) fresh.push(c);
      else if (entry.due <= now) due.push(c);
    }
    return [...due, ...fresh].slice(0, max);
  },
};
