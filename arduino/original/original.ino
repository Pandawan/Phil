#include <WiFi.h>

int LED = 21;

const char * ssid = "Rohan";
const char * password = "07092001";
const char* host = "www.dweet.io";

String last = "";

void setup() {
  pinMode(LED, OUTPUT);
  digitalWrite(LED, HIGH);

  Serial.begin(115200);
  delay(100);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  Serial.println(WiFi.macAddress());
  
  Serial.print("connecting to ");
  Serial.println(host);

  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  String url = "/get/latest/dweet/for/quagmire";
  Serial.print("Requesting URL: ");
  Serial.println(url);

  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");
  delay(1000);

  while (client.available()) {
    String received = client.readString();
    String firstDivider = "created";
    String secondDivider = "content";
    int firstDividerIndex = received.indexOf(firstDivider);
    int secondDividerIndex = received.indexOf(secondDivider);
    String line = received.substring(firstDividerIndex, secondDividerIndex);
    Serial.println(line);

    if (line.equals(last)) {
      digitalWrite(LED, LOW);
      Serial.println("LED off");
    }

    else if (line.equals(last)) {
      digitalWrite(LED, HIGH);
      Serial.println("LED on");
    }
  }

  Serial.println("closing connection");
  Serial.println();

  delay(1000);
}
