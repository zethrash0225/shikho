// App router
const VIEWS = {
  home: PathView,
  alphabet: AlphabetView,
  stories: StoriesView,
  conversation: ConversationView,
  settings: SettingsView,
};

let currentView = "home";

function switchView(view) {
  if (!VIEWS[view]) view = "home";
  currentView = view;
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
  const main = document.getElementById("main");
  VIEWS[view].render(main);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Pure read of state into topbar. Re-entrancy guard so save → updateTopbar
// can never recurse back into save.
let _updatingTopbar = false;
function updateTopbar() {
  if (_updatingTopbar) return;
  _updatingTopbar = true;
  try {
    const fresh = Storage.load();
    const ids = { "streak-count": fresh.streak, "xp-count": fresh.xp };
    for (const [id, val] of Object.entries(ids)) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }
  } finally {
    _updatingTopbar = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Speech.init();

  // Register the service worker for offline / install support.
  // Only registers if served over http(s); skipped on file:// to avoid noise.
  if ("serviceWorker" in navigator && /^https?:/.test(location.protocol)) {
    navigator.serviceWorker.register("./sw.js").catch(err => console.warn("SW register failed:", err));
  }

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  updateTopbar();
  switchView("home");

  // Mirror save → topbar refresh
  const origSave = Storage.save;
  Storage.save = function (s) {
    origSave(s);
    updateTopbar();
  };
});
