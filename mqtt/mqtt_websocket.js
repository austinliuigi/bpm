// const mqtt = require('mqtt')

const url = 'ws://broker.hivemq.com:8000/mqtt'

const options = {
  clean: true,
  connectTimeout: 4000,
}

const client  = mqtt.connect(url, options)

client.on('connect', function () {
  console.log('Connected')
  client.subscribe('ucla/hack', function (err) {
    if (!err) {
      client.publish('ucla/hack', 'woof')
    }
  })
})

// Receive messages
client.on('message', function (topic, message) {
  console.log(message.toString())
  const element = document.querySelector('#bpm')
  element.innerHTML = `bpm is ${message.toString()}`
})
