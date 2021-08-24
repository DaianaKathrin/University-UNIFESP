/****** Daiana Kathrin Santana Santos *******/
/*************** RA: 120.357 ***************/

//Pinos de Entrada/Saida
const int led20 = 1;
const int led22 = 2;
const int led24 = 3;
const int led26 = 4;
const int led28 = 5;
const int led30 = 6;
const int led32 = 7;
const int led34 = 8;
const int led36 = 9;
const int led38 = 10;
const int buzzerpin = 12;

int baselineTemp = 0;
int celsius = 0;
int fahrenheit = 0;

const int buttonPin = 13;
int buttonState;
int lastButtonState = LOW;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 5;

unsigned long timereset;

void setup() {
  //pinMode(A0, INPUT);
  Serial.begin(9600);

  pinMode(buzzerpin, OUTPUT);
  pinMode(led20, OUTPUT);
  pinMode(led22, OUTPUT);
  pinMode(led24, OUTPUT);
  pinMode(led26, OUTPUT);
  pinMode(led28, OUTPUT);
  pinMode(led30, OUTPUT);
  pinMode(led32, OUTPUT);
  pinMode(led34, OUTPUT);
  pinMode(led36, OUTPUT);
  pinMode(led38, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  baselineTemp = 40;

  //celsius = map(((analogRead(A0) - 20) * 3.04), 0, 1023, -40, 125);
  int reading2 = analogRead(A0);
  float voltage = reading2 * (5000 / 1024.0);
  float celsius = (voltage - 500) / 10;
  int reading = digitalRead(buttonPin);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;

      if (buttonState == HIGH) {
        Serial.print(celsius);
        Serial.println(" C ");
      }
    }
  }
  lastButtonState = reading;

  if (celsius < 20) {
    digitalWrite(led20, LOW);
    digitalWrite(led22, LOW);
    digitalWrite(led24, LOW);
    digitalWrite(led26, LOW);
    digitalWrite(led28, LOW);
    digitalWrite(led30, LOW);
    digitalWrite(led32, LOW);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 20 && celsius < 22) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, LOW);
    digitalWrite(led24, LOW);
    digitalWrite(led26, LOW);
    digitalWrite(led28, LOW);
    digitalWrite(led30, LOW);
    digitalWrite(led32, LOW);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 22 && celsius < 24) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, LOW);
    digitalWrite(led26, LOW);
    digitalWrite(led28, LOW);
    digitalWrite(led30, LOW);
    digitalWrite(led32, LOW);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 24 && celsius < 26) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, LOW);
    digitalWrite(led28, LOW);
    digitalWrite(led30, LOW);
    digitalWrite(led32, LOW);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 26 && celsius < 28) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, LOW);
    digitalWrite(led30, LOW);
    digitalWrite(led32, LOW);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 28 && celsius < 30) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, HIGH);
    digitalWrite(led30, LOW);
    digitalWrite(led32, LOW);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 30 && celsius < 32) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, HIGH);
    digitalWrite(led30, HIGH);
    digitalWrite(led32, LOW);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 32 && celsius < 34) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, HIGH);
    digitalWrite(led30, HIGH);
    digitalWrite(led32, HIGH);
    digitalWrite(led34, LOW);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 34 && celsius < 36) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, HIGH);
    digitalWrite(led30, HIGH);
    digitalWrite(led32, HIGH);
    digitalWrite(led34, HIGH);
    digitalWrite(led36, LOW);
    digitalWrite(led38, LOW);
  } else if (celsius >= 36 && celsius < 38) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, HIGH);
    digitalWrite(led30, HIGH);
    digitalWrite(led32, HIGH);
    digitalWrite(led34, HIGH);
    digitalWrite(led36, HIGH);
    digitalWrite(led38, LOW);
  } else if (celsius >= 38 && celsius <=40) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, HIGH);
    digitalWrite(led30, HIGH);
    digitalWrite(led32, HIGH);
    digitalWrite(led34, HIGH);
    digitalWrite(led36, HIGH);
    digitalWrite(led38, HIGH);
  }
  if (celsius > 40) {
    digitalWrite(led20, HIGH);
    digitalWrite(led22, HIGH);
    digitalWrite(led24, HIGH);
    digitalWrite(led26, HIGH);
    digitalWrite(led28, HIGH);
    digitalWrite(led30, HIGH);
    digitalWrite(led32, HIGH);
    digitalWrite(led34, HIGH);
    digitalWrite(led36, HIGH);
    digitalWrite(led38, HIGH);
    timereset = millis();
    if ((millis() - timereset) < 3000) {
      digitalWrite(buzzerpin, HIGH);
    } else if ((millis() - timereset) > 3000 && (millis() - timereset) < 6000) {
      digitalWrite(buzzerpin, LOW);
    } else if ((millis() - timereset) > 6000) {
      digitalWrite(buzzerpin, HIGH);
      timereset = millis();
    }

  } else {
    digitalWrite(buzzerpin, LOW);
  }
 
}