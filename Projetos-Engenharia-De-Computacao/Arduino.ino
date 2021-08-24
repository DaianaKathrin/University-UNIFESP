
// INCLUSÃO DE BIBLIOTECAS
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <idDHT11.h>


// INSTANCIANDO OBJETOS
LiquidCrystal_I2C lcd(0x3F, 20, 4);


#define pinBotao1 13
#define pinLED1   10

#define pinBotao2 12
#define pinLED2   9


boolean pinBotao1Retencao();
boolean pinBotao2Retencao();

char serial;
boolean serialA;
boolean serialB;
boolean serialC;

void setup() {
  lcd.init(); // INICIA A COMUNICAÇÃO COM O DISPLAY
  lcd.backlight(); // LIGA A ILUMINAÇÃO DO DISPLAY
  lcd.clear(); // LIMPA O DISPLAY
  pinMode(pinBotao1, INPUT_PULLUP);
  pinMode(pinBotao2, INPUT_PULLUP);
  pinMode(pinLED1, OUTPUT);
  pinMode(pinLED2, OUTPUT);
  pinMode(7, OUTPUT);
  Serial.begin(9600);
  serial = 'z';
  serialA = LOW;
  serialB = LOW;
  serialC = LOW;
 
}

//declaration
void dht11_wrapper(); // must be declared before the lib initialization
void loopDHT();       	// Atualiza a leitura do sensor

// Lib instantiate
idDHT11 DHT11( 2 , 0, dht11_wrapper);



//Variaveis que irao conter os valores lidos no Sensor DHT11
float temperaturaC;
float temperaturaF;
float temperaturaK;
float umidade;
float dewPoint;
float dewPointSlow;

void loop() {

  lcd.setCursor(0, 0); // POSICIONA O CURSOR NA PRIMEIRA COLUNA DA LINHA 2
  lcd.print("temperatura:");
  lcd.setCursor(0, 1);
  loopDHT();
  lcd.print(temperaturaC);

if(Serial.available()>0){
      	serial = Serial.read();
      	//lcd.print(serial);
      	if(serial == 'A'){
        	serialA = 'A';
      	}else if(serial == 'B'){
        	serialB = 'B';
      	}else if(serial == 'C'){
        	serialC = 'C';
      	}else if(serial == 'X'){
        	serialC = 'z';
      	}else if(serial == 'Z'){
        	serialA = 'z';
        	serialB = 'z';
      	}
   }
   
   if(serialC == 'C'){
 	digitalWrite(7, HIGH);
   }else{
 	if(temperaturaC > 25) {
    	digitalWrite(7, HIGH);
 	} else {
   	digitalWrite(7, LOW);
 	}
   }
   
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
   
}


boolean pinBotao1Retencao() {
   #define tempoDebounce 50 //(tempo para eliminar o efeito Bounce EM MILISEGUNDOS)

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
   	estadoBotao = digitalRead(pinBotao1);
   	if ( (estadoBotao && (estadoBotao != estadoBotaoAnt) || serialB == 'B') ) {
      	estadoRet = !estadoRet;
      	delayBotao = millis();
   	}
   	estadoBotaoAnt = estadoBotao;
   }

   return estadoRet;
}


boolean pinBotao2Retencao() {
   #define tempoDebounce 50 //(tempo para eliminar o efeito Bounce EM MILISEGUNDOS)

   bool estadoBotao;
   static bool estadoBotaoAnt;
   static bool estadoRet = true;
   static unsigned long delayBotao = 0;

   if ( (millis() - delayBotao) > tempoDebounce ) {
   	estadoBotao = digitalRead(pinBotao2);
   	if ( (estadoBotao && (estadoBotao != estadoBotaoAnt)) || serialA == 'A') {
      	estadoRet = !estadoRet;
      	delayBotao = millis();
   	}
   	estadoBotaoAnt = estadoBotao;
   }
   
   return estadoRet;
}


void dht11_wrapper() {
  DHT11.isrCallback();
}

void loopDHT() {
#define tempoLeitura 500
static unsigned long delayLeitura = millis() + tempoLeitura + 1;
static bool request = false;

  if ((millis() - delayLeitura) > tempoLeitura) {
  	if (!request) {
     	DHT11.acquire();
     	request = true;
  	}
  }

  if (request && !DHT11.acquiring()) {
	request = false;

	int result = DHT11.getStatus();
 	 
	switch (result)
	{
	case IDDHTLIB_OK:
    	Serial.println("Leitura OK");
    	break;
	case IDDHTLIB_ERROR_CHECKSUM:
    	Serial.println("Erro\n\r\tErro Checksum");
    	break;
	case IDDHTLIB_ERROR_ISR_TIMEOUT:
    	Serial.println("Erro\n\r\tISR Time out");
    	break;
	case IDDHTLIB_ERROR_RESPONSE_TIMEOUT:
    	Serial.println("Erro\n\r\tResponse time out");
    	break;
	case IDDHTLIB_ERROR_DATA_TIMEOUT:
    	Serial.println("Erro\n\r\tData time out erro");
    	break;
	case IDDHTLIB_ERROR_ACQUIRING:
    	Serial.println("Erro\n\r\tAcquiring");
    	break;
	case IDDHTLIB_ERROR_DELTA:
    	Serial.println("Erro\n\r\tDelta time to small");
    	break;
	case IDDHTLIB_ERROR_NOTSTARTED:
    	Serial.println("Erro\n\r\tNao iniciado");
    	break;
	default:
    	Serial.println("Erro Desconhecido");
    	break;
	}
    
	if(result == IDDHTLIB_OK){
  	float valor = DHT11.getCelsius();
  	 
  	if (!isnan(valor)) {        	 
    	temperaturaC = valor;
  	}
 
  	valor = DHT11.getHumidity();
  	if (!isnan(valor)) { 	 
    	umidade = valor;
  	}  
 
  	valor = DHT11.getFahrenheit();
  	if (!isnan(valor)) { 	 
    	temperaturaF = valor;
  	}  
 
  	valor = DHT11.getKelvin();
  	if (!isnan(valor)) { 	 
    	temperaturaK = valor;
  	}  
 
  	valor = DHT11.getDewPoint();
  	if (!isnan(valor)) { 	 
    	dewPoint = valor;
  	}  
	 
  	valor = DHT11.getDewPointSlow();
  	if (!isnan(valor)) { 	 
    	dewPointSlow = valor;
  	}
	}

	delayLeitura = millis();	 
  }
}

