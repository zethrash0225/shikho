// Service worker — cache the app shell so it works offline once installed.
// Bump CACHE_VERSION whenever you change app files.

const CACHE_VERSION = "shikho-v2";

const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./data/alphabet.js",
  "./data/dialogues.js",
  "./data/units.js",
  "./data/stories.js",
  "./js/storage.js",
  "./js/audio.js",
  "./js/keyboard.js",
  "./js/shadowing.js",
  "./js/dict.js",
  "./js/lesson-player.js",
  "./js/path.js",
  "./js/alphabet.js",
  "./js/stories.js",
  "./js/conversation.js",
  "./js/settings.js",
  "./js/app.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Only cache GETs from same origin; everything else (TTS, API) passes through.
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((resp) => {
        // Cache successful responses for next time
        if (resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return resp;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
