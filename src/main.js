import "./style.css";
import heartLogo from "./assets/heart.svg";

// set up Paho MQTT client
let env = {
  broker: "broker.hivemq.com",
  port: 8000,
  clientID: "web" + new Date().getTime(),
};

const client = new Paho.Client(env.broker, env.port, env.clientID);

const sendMessage = (bpm) => {
  // Replace this function with your actual function to send the message
  console.log("Sending message:", bpm);
  const message = new Paho.Message(bpm); // message the heart rate to the broker
  message.destinationName = "ucla/hack";
  client.send(message);
};

const sendMessagesInIntervals = () => {
  const messages = [
    "Message 1",
    "Message 2",
    "Message 3",
    "Message 4",
    "Message 5",
  ];
  let index = 0;

  const sendNextMessage = () => {
    if (index < messages.length) {
      const message = messages[index];
      sendMessage(message);
      index++;

      // Set a 1 millisecond delay and call sendNextMessage again
      setTimeout(sendNextMessage, 1000);
    }
  };

  // Start sending messages
  sendNextMessage();
};

const onConnect = () => {
  console.log("Connected");
  client.subscribe("ucla/hack");
  const message = new Paho.Message("100"); // message the heart rate to the broker
  message.destinationName = "ucla/hack";
  client.send(message);

  // Call the function to start sending messages in intervals
  sendMessagesInIntervals();
};

const onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
};

const onMessageArrived = (message) => {
  console.log("Message received");
  console.log(message.payloadString);
  const element = document.querySelector("#bpm");
  element.innerHTML = message.payloadString;
};

client.connect({ onSuccess: onConnect });
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://etransfercenter.seas.ucla.edu/" target="_blank">
      <img src="${heartLogo}" class="logo heart" alt="Heart" />
    </a>
    <div class="card">
      <button id="bpm" type="button"></button>
    </div>
  </div>
`;
