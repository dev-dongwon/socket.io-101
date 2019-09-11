

const socket = io("http://localhost:9000");

socket.on("connect", () => {
  console.log(socket.id);
});

const messageForm = document.getElementById("message-form");
const userMessage = document.getElementById("user-message");
const messageArea = document.getElementById("messages");

messageForm.addEventListener("submit", event => {
  event.preventDefault();

  const newMessage = userMessage.value;
  socket.emit("newMessage", { text: newMessage, id: socket.id });

  userMessage.value = "";
});

socket.on("messageToClient", msg => {
  messageArea.innerHTML += `<li>${msg.id} : ${msg.text}</li>`;
});