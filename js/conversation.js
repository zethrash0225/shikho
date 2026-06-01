// Conversation: scripted dialogues + (optional) live Claude tutor
const ConversationView = {
  render(container) {
    container.innerHTML = "";

    const header = document.createElement("div");
    header.className = "view-header";
    header.innerHTML = `
      <h2>Conversation Practice</h2>
      <p>Roleplay real situations. Pick a scenario, or chat with the AI tutor (requires an API key in Settings).</p>
    `;
    container.appendChild(header);

    // Live tutor card
    const tutor = document.createElement("div");
    tutor.className = "lesson-card";
    tutor.style.borderColor = "var(--accent)";
    tutor.innerHTML = `
      <span class="level-badge">AI Tutor</span>
      <h3>Chat with Claude — your live tutor</h3>
      <p>Free-form Gujarati conversation with corrections. Add an Anthropic API key in Settings to enable.</p>
    `;
    tutor.addEventListener("click", () => ConversationView.openAITutor(container));
    container.appendChild(tutor);

    // Scripted dialogues
    const h = document.createElement("h3");
    h.className = "section-title";
    h.textContent = "Scripted scenarios";
    container.appendChild(h);

    const grid = document.createElement("div");
    grid.className = "grid large";
    const state = Storage.load();

    for (const d of DIALOGUES) {
      const done = state.dialoguesDone.includes(d.id);
      const card = document.createElement("div");
      card.className = "lesson-card";
      card.innerHTML = `
        <span class="level-badge">Level ${d.level}${done ? " · ✓" : ""}</span>
        <h3>${d.title}</h3>
        <p>${d.scenario}</p>
      `;
      card.addEventListener("click", () => ConversationView.openDialogue(container, d));
      grid.appendChild(card);
    }
    container.appendChild(grid);
  },

  openDialogue(container, dialogue) {
    container.innerHTML = "";

    const back = document.createElement("div");
    back.className = "back-row";
    back.innerHTML = `<button class="back-btn">← Scenarios</button>`;
    back.querySelector(".back-btn").addEventListener("click", () => ConversationView.render(container));
    container.appendChild(back);

    const stage = document.createElement("div");
    stage.className = "chat-stage";

    const scenario = document.createElement("div");
    scenario.className = "chat-scenario";
    scenario.textContent = dialogue.scenario;
    stage.appendChild(scenario);

    const messages = document.createElement("div");
    messages.className = "chat-messages";
    stage.appendChild(messages);

    const optionsHost = document.createElement("div");
    optionsHost.className = "chat-options";
    stage.appendChild(optionsHost);

    container.appendChild(stage);

    let step = 0;
    let mistakes = 0;

    function showStep() {
      if (step >= dialogue.steps.length) {
        const finalMsg = document.createElement("div");
        finalMsg.className = "chat-msg partner";
        finalMsg.innerHTML = `<div class="en-line">Scenario complete! ${mistakes === 0 ? "No mistakes 🎉" : `${mistakes} mistake${mistakes === 1 ? "" : "s"}.`}</div>`;
        messages.appendChild(finalMsg);
        optionsHost.innerHTML = "";
        const again = document.createElement("button");
        again.className = "btn btn-primary";
        again.textContent = "Replay";
        again.addEventListener("click", () => ConversationView.openDialogue(container, dialogue));
        optionsHost.appendChild(again);

        const state = Storage.load();
        if (!state.dialoguesDone.includes(dialogue.id)) {
          state.dialoguesDone.push(dialogue.id);
          Storage.save(state);
        }
        Storage.markStudiedToday();
        return;
      }

      const s = dialogue.steps[step];
      const partnerMsg = document.createElement("div");
      partnerMsg.className = "chat-msg partner";
      partnerMsg.innerHTML = `
        <div class="gu-line">${s.partner.gu}</div>
        <div class="tr-line">${s.partner.translit}</div>
        <div class="en-line">${s.partner.en}</div>
      `;
      const sb = speakButton(s.partner.gu);
      sb.style.float = "right";
      sb.style.marginLeft = "8px";
      partnerMsg.prepend(sb);
      messages.appendChild(partnerMsg);
      messages.scrollTop = messages.scrollHeight;

      // Auto-speak partner line
      Speech.speak(s.partner.gu);

      // Render options
      optionsHost.innerHTML = "";
      const shuffled = [...s.options].sort(() => Math.random() - 0.5);
      for (const opt of shuffled) {
        const btn = document.createElement("button");
        btn.className = "chat-option";
        btn.innerHTML = `
          <div class="opt-gu">${opt.gu}</div>
          <div class="opt-en">${opt.en}</div>
        `;
        btn.addEventListener("click", async () => {
          // Disable other options
          [...optionsHost.querySelectorAll(".chat-option")].forEach(b => b.disabled = true);
          if (opt.correct) {
            btn.classList.add("correct");
            // Add user message to chat
            const userMsg = document.createElement("div");
            userMsg.className = "chat-msg user";
            userMsg.innerHTML = `<div class="gu-line">${opt.gu}</div><div class="en-line">${opt.en}</div>`;
            messages.appendChild(userMsg);
            messages.scrollTop = messages.scrollHeight;
            // Wait for the user's audio to finish before moving on, so the next
            // partner line doesn't cancel it mid-playback.
            Speech.stop(); // stop any partner audio still playing
            await Speech.speak(opt.gu);
            // Small breathing pause so the green checkmark registers visually
            await new Promise(r => setTimeout(r, 350));
            step += 1;
            showStep();
          } else {
            btn.classList.add("wrong");
            mistakes += 1;
            toast("Not quite — try the other option.");
            setTimeout(() => {
              btn.disabled = true;
              [...optionsHost.querySelectorAll(".chat-option")].forEach(b => {
                if (!b.classList.contains("wrong")) b.disabled = false;
              });
            }, 600);
          }
        });
        optionsHost.appendChild(btn);
      }
    }

    showStep();
  },

  openAITutor(container) {
    container.innerHTML = "";

    const back = document.createElement("div");
    back.className = "back-row";
    back.innerHTML = `<button class="back-btn">← Back</button>`;
    back.querySelector(".back-btn").addEventListener("click", () => ConversationView.render(container));
    container.appendChild(back);

    const state = Storage.load();
    const hasKey = !!state.apiKey;

    const stage = document.createElement("div");
    stage.className = "chat-stage";

    const scenario = document.createElement("div");
    scenario.className = "chat-scenario";
    scenario.innerHTML = hasKey
      ? "AI tutor: Type in English or Gujarati. The tutor will reply in Gujarati with translit + English, and correct mistakes."
      : "⚠️ No API key configured. Add one in Settings → API to enable live conversation. You can still preview the interface.";
    stage.appendChild(scenario);

    const messages = document.createElement("div");
    messages.className = "chat-messages";
    stage.appendChild(messages);

    // Seed greeting
    addMessage(messages, "partner",
      "નમસ્તે! ચાલો, ગુજરાતીમાં વાત કરીએ. શું શીખવું છે આજે?",
      "Namaste! Chālo, gujarātīmā̃ vāt karīe. Shū̃ shīkhvū̃ chhe āje?",
      "Hello! Let's chat in Gujarati. What would you like to learn today?");

    const inputRow = document.createElement("div");
    inputRow.className = "ai-tutor-input";
    inputRow.innerHTML = `
      <input type="text" id="tutor-input" placeholder="Type a message in English or Gujarati…" />
      <button class="btn btn-primary" id="tutor-send">Send</button>
    `;
    stage.appendChild(inputRow);

    container.appendChild(stage);

    const conversation = [];

    async function send() {
      const input = document.getElementById("tutor-input");
      const text = input.value.trim();
      if (!text) return;
      addMessage(messages, "user", text, "", "");
      input.value = "";

      if (!state.apiKey) {
        addMessage(messages, "partner",
          "(Demo mode) મારી પાસે API key નથી — Settings માં ઉમેરો.",
          "(Demo mode) Mārī pāse API key nathī — Settings mā̃ umero.",
          "(Demo mode) I don't have an API key — please add one in Settings.");
        return;
      }

      conversation.push({ role: "user", content: text });
      const loading = addMessage(messages, "partner", "…", "", "");

      try {
        const reply = await callClaude(state.apiKey, conversation);
        loading.remove();
        const parsed = parseTutorReply(reply);
        addMessage(messages, "partner", parsed.gu, parsed.translit, parsed.en);
        conversation.push({ role: "assistant", content: reply });
      } catch (err) {
        loading.remove();
        addMessage(messages, "partner", "ભૂલ થઈ.", "Bhūl thaī.", `Error: ${err.message}`);
      }
    }

    inputRow.querySelector("#tutor-send").addEventListener("click", send);
    inputRow.querySelector("#tutor-input").addEventListener("keydown", e => {
      if (e.key === "Enter") send();
    });
  },
};

function addMessage(host, role, gu, translit, en) {
  const msg = document.createElement("div");
  msg.className = `chat-msg ${role}`;
  let html = "";
  if (gu) html += `<div class="gu-line">${gu}</div>`;
  if (translit) html += `<div class="tr-line">${translit}</div>`;
  if (en) html += `<div class="en-line">${en}</div>`;
  msg.innerHTML = html;
  if (role === "partner" && gu) {
    const sb = speakButton(gu);
    sb.style.float = "right";
    sb.style.marginLeft = "8px";
    msg.prepend(sb);
  }
  host.appendChild(msg);
  host.scrollTop = host.scrollHeight;
  return msg;
}

// Parse "GU || translit || EN" format from Claude. Falls back gracefully.
function parseTutorReply(text) {
  const parts = text.split(/\s*\|\|\s*/);
  if (parts.length >= 3) return { gu: parts[0].trim(), translit: parts[1].trim(), en: parts[2].trim() };
  // Try to split by line
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length >= 3) return { gu: lines[0], translit: lines[1], en: lines[2] };
  if (lines.length === 2) return { gu: lines[0], translit: "", en: lines[1] };
  return { gu: text, translit: "", en: "" };
}

async function callClaude(apiKey, messages) {
  const systemPrompt = `You are a friendly Gujarati language tutor. The student is a complete beginner learning conversational Gujarati.
For every reply:
1. Respond in Gujarati (script), keeping vocabulary simple and matched to the student's level.
2. If they make grammar or vocabulary mistakes, gently correct them.
3. Format every reply EXACTLY as three parts separated by " || ":
   <Gujarati script> || <romanized transliteration> || <English translation>
Keep responses to 1-2 sentences. Ask follow-up questions to keep the conversation going.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: systemPrompt,
      messages: messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text || "(no reply)";
}
