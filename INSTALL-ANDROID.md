# Install Shīkho on Android

This app is a **Progressive Web App (PWA)**. There are three ways to get it on your phone, in increasing order of effort.

---

## Option 1 — Quickest: host it free, install via Chrome (5 min)

This gives you a real app icon on your home screen that launches full-screen, with offline support after the first visit.

1. **Create a free GitHub account** at https://github.com if you don't have one.
2. Create a new public repo named `shikho` (or anything you like).
3. Upload **everything in this folder** into the repo:
   - `index.html`, `styles.css`, `manifest.json`, `sw.js`
   - The `data/`, `js/`, and `icons/` folders
4. Go to repo **Settings → Pages**. Under "Source" pick `main` branch, root folder, Save.
5. After ~30 seconds your app is live at `https://<your-username>.github.io/shikho/`.
6. On your Android phone, open that URL in **Chrome**.
7. Tap the ⋮ menu → **Install app** (or "Add to Home Screen"). Done — it's now in your app drawer.

Other free hosts that work the same way: **Netlify Drop** (`netlify.com/drop` — just drag the folder onto the page), **Cloudflare Pages**, **Vercel**.

---

## Option 2 — Real APK via PWABuilder (10 min)

If you want an actual `.apk` file you can sideload (or eventually publish to the Play Store):

1. Host the app first using Option 1 above — PWABuilder needs a live URL.
2. Go to **https://www.pwabuilder.com**.
3. Paste your `https://<user>.github.io/shikho/` URL and click **Start**.
4. It'll audit your PWA (should score well — manifest + icons + service worker are all set up).
5. Click **Package For Stores → Android**. Defaults are fine.
6. Download the generated `.apk` (or `.aab` for Play Store).
7. On your Android phone, transfer the APK (USB, Drive, email) and tap it to install. You'll need to allow installs from your file manager the first time.

---

## Option 3 — Local-only (no internet)

PWAs need `http(s)://` to install. To run locally on a phone with no hosting:

1. Install a free file-server app like **Servediter** or **Simple HTTP Server** on Android.
2. Copy this whole folder onto your phone's storage.
3. Point the server at the folder; it'll give you something like `http://localhost:8080/`.
4. Open that URL in Chrome — install as in Option 1.

This is fiddly. Option 1 is what I recommend.

---

## Notes

- **Audio:** Pronunciation uses Google Translate TTS over the network. The first time you play audio, the browser asks for permission; tap allow. If you're offline and Google TTS isn't cached, audio will fall back to your phone's built-in Web Speech voice (install a Hindi or Gujarati voice in **Settings → Language & input → Text-to-speech** for the best fallback).
- **Offline:** Once the service worker has activated (open the app once with internet), all lessons, stories, and the alphabet work offline. The AI Tutor in Conversation needs internet — it calls the Claude API.
- **Updates:** When you change files in the repo, bump `CACHE_VERSION` in `sw.js` so phones pick up the new bundle.
- **AI Tutor:** Settings → paste your Anthropic API key. It's stored only in your browser's localStorage and only ever sent to `api.anthropic.com`.

---

## Troubleshooting

**"Install app" doesn't show up in Chrome's menu**
The PWA criteria aren't met. Most common cause: not served over HTTPS. GitHub Pages and Netlify both serve HTTPS by default, so use those.

**Icons look wrong**
Bump `CACHE_VERSION` in `sw.js`, then in Chrome → ⋮ → Settings → Site settings → All sites → find your site → Clear data. Reload.

**PWABuilder complains about missing manifest fields**
Edit `manifest.json` and make sure no fields are blank. The current one is complete.
