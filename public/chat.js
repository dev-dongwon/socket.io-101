const ChatSocket = class {
  constructor() {
    this.socket = io("http://localhost:9000");
    this.messageForm = document.getElementById("message-form");
    this.userMessage = document.getElementById("user-message");
    this.messageArea = document.getElementById("messages");
  }

  connect() {
    this.socket.on("connect", () => {
      this.socket.emit("newPerson", { id: this.socket.id });
    });
  }

  submit() {
    this.messageForm.addEventListener("submit", event => {
      event.preventDefault();

      const newMessage = this.userMessage.value;
      this.socket.emit("newMessage", { text: newMessage, id: this.socket.id });

      this.userMessage.value = "";
    });
  }

  getMessageByType({type, id, text}) {
    if (type === 'enter') {
      return `${id} 님이 입장하셨습니다`
    } 
    
    if (type === 'texting') {
      return `${id} : ${text}`
    }
  }

  receiveMessage() {
    this.socket.on("messageToClient", msg => {
      this.messageArea.innerHTML += `<li>${this.getMessageByType(msg)}</li>`;
    });
  }

  run() {
    this.connect();
    this.submit();
    this.receiveMessage();
  }
};

window.onload = () => {
  const chatSocket = new ChatSocket();
  chatSocket.run();
}