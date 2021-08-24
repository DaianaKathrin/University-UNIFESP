#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

#define BLYNK_PRINT Serial

#define tempoDebounce 10 //(tempo para eliminar o efeito Bounce EM MILISEGUNDOS)

#define pinBotao1 23
#define pinLED1   13

#define pinBotao2 4
#define pinLED2   12

#define pinBotao3 5
#define pinLED3 14

#define pinBotao4 18
#define pinLED4 27

#define pinBotao5 19
#define pinLED5 26

#define pinBotao6 21
#define pinLED6 25

#define pinBotao7 22
#define pinLED7 33


boolean pinBotao1Retencao();
boolean pinBotao2Retencao();
boolean pinBotao3Retencao();
boolean pinBotao4Retencao();
boolean pinBotao5Retencao();
boolean pinBotao6Retencao();
boolean pinBotao7Retencao();


int pinValue1;
int pinValue2;
int pinValue3;
int pinValue4;
int pinValue5;
int pinValue6;
int pinValue7;
int pinValue8;
int pinValue9;
int pinValue10;



char auth[] = "_npuvzdyd3dc3iFgWUU1anpdEvLgR550";
// char ssid[] = "Casa 2G";
// char pass[] = "senhanet5838";

char ssid[] = "Mira 2G";
char pass[] = "18205590";

// BLYNK_CONNECTED(){
//   Blynk.syncVirtual(V0);
//   Blynk.syncVirtual(V1);
//   Blynk.syncVirtual(V1);

// }

//LUZ SALA
BLYNK_WRITE(V0) {
   pinValue1 = param.asInt();
}

//LUZ COZINHA
BLYNK_WRITE(V1) {
   pinValue2 = param.asInt();
   if(pinValue2 == HIGH){
       Serial.print('A');
   }
   else{
       Serial.print('B');
   }
}

//LUZ BANHEIRO
BLYNK_WRITE(V2) {
   pinValue3 = param.asInt();
}

//LUZ QUARTO
BLYNK_WRITE(V3) {
   pinValue4 = param.asInt();
}

//LUZ ESCRITORIO
BLYNK_WRITE(V4) {
   pinValue5 = param.asInt();
}

//LUZ QUARTO 2
BLYNK_WRITE(V5) {
   pinValue6 = param.asInt();
}

//LUZ EXTERNA
BLYNK_WRITE(V6) {
   pinValue7 = param.asInt();
}

//AR CONDICIONADO
BLYNK_WRITE(V7) {
   if(param.asInt()){
       Serial.print('A');
   }
   else{
       Serial.print('Z');
   }
}

//PORTAO
BLYNK_WRITE(V8) {
   if(param.asInt()){
       Serial.print('1');
   }
   else{
       Serial.print('0');
   }
}

////ALARME
BLYNK_WRITE(V9) {
   if(param.asInt() == HIGH){
       Serial.print('C');
   }
   else{
       Serial.print('D');
   }
}

void setup() {
   Serial.begin(9600);
   Blynk.begin(auth, ssid, pass);
   pinMode(pinBotao1, INPUT_PULLUP);
   pinMode(pinBotao2, INPUT_PULLUP);
   pinMode(pinBotao3, INPUT_PULLUP);
   pinMode(pinBotao4, INPUT_PULLUP);
   pinMode(pinBotao5, INPUT_PULLUP);
   pinMode(pinBotao6, INPUT_PULLUP);

   pinMode(pinLED1, OUTPUT);
   pinMode(pinLED2, OUTPUT);
   pinMode(pinLED3, OUTPUT);
   pinMode(pinLED4, OUTPUT);
   pinMode(pinLED5, OUTPUT);
   pinMode(pinLED6, OUTPUT);

}

void loop() {
   Blynk.run();

   if (pinBotao1Retencao()) {
       digitalWrite(pinLED1, HIGH);
   } else {
       digitalWrite(pinLED1, LOW);
   }

   if (pinBotao2Retencao()) {
       digitalWrite(pinLED2, HIGH);
   } else {
       digitalWrite(pinLED2, LOW);
   }

   if (pinBotao3Retencao()) {
       digitalWrite(pinLED3, HIGH);
   } else {
       digitalWrite(pinLED3, LOW);
   }

   if (pinBotao4Retencao()) {
       digitalWrite(pinLED4, HIGH);
   } else {
       digitalWrite(pinLED4, LOW);
   }

   if (pinBotao5Retencao()) {
       digitalWrite(pinLED5, HIGH);
   } else {
       digitalWrite(pinLED5, LOW);
   }

   if (pinBotao6Retencao()) {
       digitalWrite(pinLED6, HIGH);
   } else {
       digitalWrite(pinLED6, LOW);
   }


}

boolean pinBotao1Retencao() {

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoVirtual;
   static bool estadovirtualAnt;

   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
       estadoBotao = digitalRead(pinBotao1);
       estadoVirtual = pinValue1;
       if ( (estadoBotao && (estadoBotao != estadoBotaoAnt)) || (estadoVirtual && (estadoVirtual != estadovirtualAnt))) {
           estadoRet = !estadoRet;
           delayBotao = millis();
       }
       estadoBotaoAnt = estadoBotao;
       estadovirtualAnt = estadoVirtual;
   }

   return estadoRet;
}


boolean pinBotao2Retencao() {

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoVirtual;
   static bool estadovirtualAnt;

   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
       estadoBotao = digitalRead(pinBotao2);
       estadoVirtual = pinValue2;
       if ( (estadoBotao && (estadoBotao != estadoBotaoAnt)) || (estadoVirtual && (estadoVirtual != estadovirtualAnt))) {
           estadoRet = !estadoRet;
           delayBotao = millis();
       }
       estadoBotaoAnt = estadoBotao;
       estadovirtualAnt = estadoVirtual;
   }

   return estadoRet;
}

boolean pinBotao3Retencao() {

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoVirtual;
   static bool estadovirtualAnt;

   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
       estadoBotao = digitalRead(pinBotao3);
       estadoVirtual = pinValue3;
       if ( (estadoBotao && (estadoBotao != estadoBotaoAnt)) || (estadoVirtual && (estadoVirtual != estadovirtualAnt))) {
           estadoRet = !estadoRet;
           delayBotao = millis();
       }
       estadoBotaoAnt = estadoBotao;
       estadovirtualAnt = estadoVirtual;
   }

   return estadoRet;
}

boolean pinBotao4Retencao() {

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoVirtual;
   static bool estadovirtualAnt;

   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
       estadoBotao = digitalRead(pinBotao4);
       estadoVirtual = pinValue4;
       if ( (estadoBotao && (estadoBotao != estadoBotaoAnt)) || (estadoVirtual && (estadoVirtual != estadovirtualAnt))) {
           estadoRet = !estadoRet;
           delayBotao = millis();
       }
       estadoBotaoAnt = estadoBotao;
       estadovirtualAnt = estadoVirtual;
   }

   return estadoRet;
}

boolean pinBotao5Retencao() {

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoVirtual;
   static bool estadovirtualAnt;

   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
       estadoBotao = digitalRead(pinBotao5);
       estadoVirtual = pinValue5;
       if ( (estadoBotao && (estadoBotao != estadoBotaoAnt)) || (estadoVirtual && (estadoVirtual != estadovirtualAnt))) {
           estadoRet = !estadoRet;
           delayBotao = millis();
       }
       estadoBotaoAnt = estadoBotao;
       estadovirtualAnt = estadoVirtual;
   }

   return estadoRet;
}

boolean pinBotao6Retencao() {

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoVirtual;
   static bool estadovirtualAnt;

   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
       estadoBotao = digitalRead(pinBotao6);
       estadoVirtual = pinValue6;
       if ( (estadoBotao && (estadoBotao != estadoBotaoAnt)) || (estadoVirtual && (estadoVirtual != estadovirtualAnt))) {
           estadoRet = !estadoRet;
           delayBotao = millis();
       }
       estadoBotaoAnt = estadoBotao;
       estadovirtualAnt = estadoVirtual;
   }

   return estadoRet;
}
