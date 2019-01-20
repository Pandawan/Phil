//#include <ESP8266WiFi.h>

int LED = LED_BUILTIN;

const char * ssid = "YOUR_NETWORK_HERE";
const char * password = "YOUR_PASSWORD_HERE";

const char* host = "www.dweet.io";

void setup() {
  pinMode(LED, OUTPUT);
  digitalWrite(LED, HIGH);

  Serial.begin(115200);
  delay(100);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  String last = "";
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
