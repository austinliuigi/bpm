import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc))

def on_disconnect(client, userdata, rc):
    if rc != 0:
        print('Unexpected Disconnect')
    else:
        print('Expected Disconnect')

def on_message(client, userdata, message):
    print('Received message: "' + str(message.payload) + '" on topic "' +
          message.topic + '" with QoS ' + str(message.qos))

client = mqtt.Client()
# client = mqtt.Client(transport="websockets")
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

client.connect("broker.hivemq.com", 1883)
# client.connect_async("broker.hivemq.com", 8000)

client.loop_start()

print('Publishing...')
while True:
    bpm = input("Enter bpm: ")
    client.publish("ucla/hack", bpm, qos=1)

client.loop_stop()
client.disconnect()
