const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', () => {
  console.log('Connected to websocket server');
});

socket.addEventListener('message', event => {
  const data = event.data;
  console.log('Received data from server:', data);
  const element = document.querySelector('#bpm')
  element.innerHTML = `bpm is ${data}`
});
