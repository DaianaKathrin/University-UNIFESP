/****** Daiana Kathrin Santana Santos *******/
/*************** RA: 120.357 ***************/


#include <Wire.h>

String frase = "";
bool ehLCD = false;

void setup()
{
  Wire.begin();
  Serial.begin(9600);
}

void loop()
{
  Wire.requestFrom(8,1);
  if(Serial.available() > 0){
  	Wire.beginTransmission(8);
    while (Serial.available() > 0){
    	char leSerial = Serial.read();
      	Wire.write(leSerial);
      	frase += leSerial;
    }
    Serial.println(frase);
    messageSent(frase);
    Wire.endTransmission();
  }
  frase = "";
  if(Wire.available()){
    byte read = Wire.read();
    printButton(read);
  }
  delay(100);
}

void messageSent(String instrucao){
  if(ehLCD){
    Serial.println("Mensagem alterada");
    ehLCD = false ;
  } 
  else{
    if(instrucao == "LigarLed"){
      Serial.println("Led Ligado");
    }
    else if(instrucao == "DesligarLed"){
      Serial.println("Led desligado");
    }
    else if(instrucao == "LigarBuzzer"){
      Serial.println("Buzzer ligado");
    }
    else if(instrucao == "DesligarBuzzer"){
      Serial.println("Buzzer desligado");
    }
    else if(instrucao == "Display LCD"){
      Serial.println("Digite a mensagem desejada ");
      ehLCD = true;
    }
  }
}  

void printButton (byte button){
  if (button == 1){
  	Serial.println("Chave 1 ON");
    Serial.println("Chave 2 OFF");
  }
  if (button == 2){
  	Serial.println("Chave 2 ON");
    Serial.println("Chave 1 OFF");
  }
}
                  