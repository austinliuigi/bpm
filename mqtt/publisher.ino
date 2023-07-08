#include <WiFi.h>
#include <PubSubClient.h>

const char *ssid = "UCLA_WEB";
const char *password = NULL;

const char *mqtt_broker = "test.mosquitto.org";
const char *pub_topic = "ucla/hack";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void connect_to_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Connected to WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("Connected to MQTT broker");
      // Once connected, publish an announcement...
      client.publish(pub_topic, "Hello from ESP ^^");
      // ... and resubscribe
      // client.subscribe("inTopic");
    }
    else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("; trying again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
    Serial.begin(9600);
    
    // Connect to WiFi
    connect_to_wifi();

    // Configure MQTT client
    client.setServer(mqtt_broker, mqtt_port);
    // client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  client.publish(pub_topic, "Sensor Data");
  delay(2000);
}
