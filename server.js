// const WebSocket = require('ws');
// const mqtt = require('mqtt')
// const url = require('url')

// // Setup websocket server
// var ws_host = "localhost";
// var ws_port = "8080";
// const wss = new WebSocket.Server({ host: ws_host, port: ws_port });
// var ws = null;
 
// // Setup MQTT Client
// // mqtt[s]://[username][:password]@host.domain[:port]
// var url = 'mqtt://test.mosquitto.org:1883'
// // var url = 'mqtt://172.20.10.2:9090'
 
// const options = {
//   // Clean session
//   port: 1883,
//   clean: true,
//   connectTimeout: 4000,
// }

// const client  = mqtt.connect(url, options)

// client.on('connect', function () {
//   console.log('Connected')
//   client.subscribe('ucla/hack', function (err) {
//     if (!err) {
//       client.publish('ucla/hack', 'woof')
//     }
//   })
// })

// // Receive messages
// client.on('message', function (topic, message) {
//   console.log(message.toString())
//   wss.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();
//     ws.send(message.toString());
//   });
// })
