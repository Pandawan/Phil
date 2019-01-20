int incomingByte = 0; // for incoming serial data
int led = 21;

void setup() {
  Serial.begin(115200); // opens serial port, sets data rate to 115200
  pinMode(led, OUTPUT); 
  
  digitalWrite(led, HIGH);
  delay(3000);
  digitalWrite(led, LOW);
}

void loop() {
  // send data only when you receive data:
  Serial.println(Serial.available());
  delay(1000);

  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();
    digitalWrite(led, HIGH);
    delay(1000);
    digitalWrite(led, LOW);

    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
  }
  delay(1000);
}
