// App router
const VIEWS = {
  home: PathView,
  alphabet: AlphabetView,
  stories: StoriesView,
  review: ReviewView,
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

// Apply saved theme to <html> so dark mode kicks in before first paint
function applyTheme() {
  const s = Storage.load();
  document.documentElement.setAttribute("data-theme", s.theme || "auto");
  // Update topbar icon if it exists
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = currentlyDark() ? "☀️" : "🌙";
}

// Returns whether the app is currently rendering in dark mode (resolving "auto" via OS pref)
function currentlyDark() {
  const t = document.documentElement.getAttribute("data-theme");
  if (t === "dark") return true;
  if (t === "light") return false;
  // auto
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function toggleTheme() {
  const s = Storage.load();
  // Toggle to the explicit opposite of what's currently showing
  s.theme = currentlyDark() ? "light" : "dark";
  Storage.save(s);
  applyTheme();
}

// Run as early as possible (deferred scripts run after DOM ready, but this still beats render)
applyTheme();

// Capture install prompt for "Install as web app" button. Browsers fire
// beforeinstallprompt exactly once; we stash it so Settings can trigger it later.
window.__installPrompt = null;
window.__isInstalled = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  window.__installPrompt = e;
  document.dispatchEvent(new CustomEvent("install-available"));
});
window.addEventListener("appinstalled", () => {
  window.__installPrompt = null;
  window.__isInstalled = true;
  document.dispatchEvent(new CustomEvent("install-state-changed"));
});

document.addEventListener("DOMContentLoaded", () => {
  Speech.init();
  applyTheme();

  // Register the service worker for offline / install support.
  // Only registers if served over http(s); skipped on file:// to avoid noise.
  if ("serviceWorker" in navigator && /^https?:/.test(location.protocol)) {
    navigator.serviceWorker.register("./sw.js").catch(err => console.warn("SW register failed:", err));
  }

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  // Wire up the topbar dark-mode toggle
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  updateTopbar();
  switchView("home");

  // Mirror save → topbar refresh
  const origSave = Storage.save;
  Storage.save = function (s) {
    origSave(s);
    updateTopbar();
  };
});
