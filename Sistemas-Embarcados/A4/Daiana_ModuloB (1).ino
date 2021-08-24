/****** Daiana Kathrin Santana Santos *******/
/*************** RA: 120.357 ***************/


#include <Wire.h>
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int buzzerPin = 9;
const int button1Pin = 8;
const int button2Pin = 7; 
const int ledPin = 6;
int button;
bool ehLCD = false;


void setup() {
  lcd.begin(16, 2);
  
  Wire.begin(8);
  Wire.onReceive(receive);
  Wire.onRequest(request);
  
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(button1Pin, INPUT);
  pinMode(button2Pin, INPUT);

  
}

void loop() {
  if(digitalRead(button1Pin) == HIGH){
    button = 1;
  }
  if(digitalRead(button2Pin) == HIGH){
    button = 2;
  }
  delay(100);
}

void receive(int h){
 String recebe = "";
  while (0 < Wire.available()){
    char leSerial = Wire.read();
    recebe +=leSerial;
  }
  ExecutaInstr(recebe);
}

void request(){
  Wire.write(button);
  button = 0;
}

void ExecutaInstr (String instrucao){
  if(ehLCD){
    lcd.clear();
    lcd.print(instrucao);
    ehLCD = false;
  }
  else{
    if(instrucao == "LigarLed"){
      digitalWrite(ledPin, HIGH);
    }
    else if(instrucao == "DesligarLed"){
      digitalWrite(ledPin, LOW);
    }
    else if(instrucao == "LigarBuzzer"){
      digitalWrite(buzzerPin, HIGH);
    }
    else if(instrucao == "DesligarBuzzer"){
      digitalWrite(buzzerPin, LOW);
    }
    else if(instrucao == "Display LCD"){
      ehLCD = true;
    }
  }
}

    
 