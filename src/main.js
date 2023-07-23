import "./style.css";
import heartLogo from "./assets/heart.svg";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://etransfercenter.seas.ucla.edu/" target="_blank">
      <img src="${heartLogo}" class="heart" alt="Heart" />
    </a>
    <div class="card">
      <button id="bpm" type="button">Loading...</button>
    </div>
  </div>
`;

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
  const messages = ["1", "2", "3", "4", "5"];
  let index = 0;

  const sendNextMessage = () => {
    if (true) {
      const message = messages[index % messages.length];
      sendMessage(message);
      index++;
      // Set a 1 millisecond delay and call sendNextMessage again
      setTimeout(sendNextMessage, 800);
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
  console.log("Message received " + message.payloadString);
  const bpmDisplay = document.querySelector("#bpm");
  bpmDisplay.innerHTML = message.payloadString;

  const animateHeartBeat = () => {
    // make heart beat for every received message
    console.log("set drop shadow");
    const heart = document.querySelector(".heart");
    heart.style.filter = "drop-shadow(0 0 1em rgba(255, 0, 0, 1))";

    setTimeout(() => {
      const fadeDropShadow = () => {
        console.log("fadeDropShadow");
        let opacity = 1;
        const interval = setInterval(function () {
          opacity -= 0.2;
          // Update the filter style with the new opacity
          heart.style.filter = `drop-shadow(0 0 1em rgba(255, 0, 0, ${opacity}))`;
          if (opacity <= 0) {
            clearInterval(interval); // Stop the interval when opacity reaches 0
          }
        }, 40); // Interval of 100 milliseconds (adjust as needed for smoothness)
      };
      fadeDropShadow();
    }, 1);
  };
  animateHeartBeat();
};

client.connect({ onSuccess: onConnect });
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
