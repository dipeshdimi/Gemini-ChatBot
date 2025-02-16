const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

const appendMessage = (message, isUser = false) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  if (isUser) {
    messageDiv.classList.add("user-message");
  } else {
    messageDiv.classList.add("bot-message");
  }
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

const showLoadingIndicator = () => {
  const loadingIndicator = document.createElement("div");
  loadingIndicator.classList.add("loading");
  loadingIndicator.textContent = "Bot is typing...";
  messagesContainer.appendChild(loadingIndicator);
  return loadingIndicator;
};

const sendMessage = () => {
  const message = messageInput.value.trim();
  if (message === "") return;

  appendMessage(message, true);
  messageInput.value = "";

  const loadingIndicator = showLoadingIndicator();

  const botMessageDiv = document.createElement("div");
  botMessageDiv.classList.add("message", "bot-message");
  botMessageDiv.textContent = "";
  messagesContainer.appendChild(botMessageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  const eventSource = new EventSource(
    `/api/stream?prompt=${encodeURIComponent(message)}`
  );

  eventSource.onmessage = (event) => {
    if (event.data === "[DONE]") {
      loadingIndicator.remove();
      eventSource.close();
    } else {
      botMessageDiv.textContent = event.data;
    }
  };

  eventSource.onerror = (error) => {
    console.error("Error receiving SSE:", error);
    eventSource.close();
    loadingIndicator.textContent = "Error occurred!";
  };
};

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
