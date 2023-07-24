import "./style.css";
import Paho from "paho-mqtt";
import heartLogo from "./assets/heart.svg";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://etransfercenter.seas.ucla.edu/" target="_blank">
      <img src="${heartLogo}" class="heart" alt="Heart" />
    </a>
    <div class="card">
      <button id="data" type="button">Waiting for data...</button>
    </div>
  </div>
`;



/* Set up MQTT client */
let env = {
  broker: "broker.hivemq.com",
  port: 8000,
  clientID: "web" + new Date().getTime(),
  topic: "ucla/hack",
};

const client = new Paho.Client(env.broker, env.port, env.clientID);



const sendMessage = (msg, topic) => {
  console.log("Sending message:", msg);
  const message = new Paho.Message(msg);
  message.destinationName = topic;
  client.send(message);
};



/* On connect callback */
const onConnect = () => {
  console.log("Connected to broker '" + env.broker + "' on topic '" + env.topic + "'");
  client.subscribe(env.topic);
  // sendMessage("Hello from the browser!", env.topic);
};



/* On disconnect callback */
const onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
};



/* On message callback */
const onMessageArrived = (message) => {
  console.log("Message received: " + message.payloadString);
  const data = document.querySelector("#data");
  data.innerHTML = message.payloadString;

  const animateHeartBeat = () => {
    const heart = document.querySelector(".heart");
    heart.style.filter = "drop-shadow(0 0 1em rgba(255, 0, 0, 0.75))";
    setTimeout(() => {
      heart.style.filter = "drop-shadow(0 0 1em rgba(255, 0, 0, 0))";
    }, 250)
  };
  animateHeartBeat();
};



client.connect({ onSuccess: onConnect });
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
