(function () {
  const toggleBtn = document.getElementById("dc-chat-toggle");
  const closeBtn = document.getElementById("dc-chat-close");
  const panel = document.getElementById("dc-chat-panel");
  const messagesEl = document.getElementById("dc-chat-messages");
  const input = document.getElementById("dc-chat-input");
  const sendBtn = document.getElementById("dc-chat-send");

  toggleBtn.addEventListener("click", () => panel.classList.toggle("open"));
  closeBtn.addEventListener("click", () => panel.classList.remove("open"));

  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "dc-msg " + sender;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    input.disabled = true;
    sendBtn.disabled = true;

    const typingEl = document.createElement("div");
    typingEl.className = "dc-msg typing";
    typingEl.innerHTML = '<span class="dc-dot"></span><span class="dc-dot"></span><span class="dc-dot"></span>';
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const res = await fetch("/chatbot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      typingEl.remove();

      if (data.reply) {
        addMessage(data.reply, "bot");
      } else {
        addMessage(data.error || "Something went wrong. Please try again.", "bot");
      }
    } catch (err) {
      typingEl.remove();
      addMessage("Something went wrong. Please try again.", "bot");
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();