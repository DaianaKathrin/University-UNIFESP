/****** Daiana Kathrin Santana Santos *******/
/*************** RA: 120.357 ***************/

//Pinos de Entrada/Saida
const int buttonVerdePin = 4;
const int buttonAmareloPin = 3;
const int buttonVermelhoPin = 2;
const int ledVerdePin = 12;
const int ledAmareloPin = 11;
const int ledVermelhoPin = 13;
const int buzzerpin = 10;

//Variaveis
int buttonVerde;
int buttonAmarelo;
int buttonVermelho;
int lastbuttonVerde = LOW;
int lastbuttonAmarelo = LOW;
int lastbuttonVermelho = LOW;
int ledVerde = LOW;
int ledAmarelo = LOW;
int ledVermelho = LOW;
int buzzer = LOW;
int contVerde = 0;
int contAmarelo = 0;

unsigned long lastDebounceVerde = 0;
unsigned long lastDebounceAmarelo = 0;
unsigned long lastDebounceVermelho = 0;
unsigned long DebounceDelay = 5;
unsigned long timereset = 100000;

void setup()
{
    pinMode(buttonVerdePin, INPUT);
    pinMode(buttonAmareloPin, INPUT);
    pinMode(buttonVermelhoPin, INPUT);
    pinMode(ledVerde, OUTPUT);
    pinMode(ledVermelho, OUTPUT);
    pinMode(ledAmarelo, OUTPUT);
    pinMode(buzzer, OUTPUT);
    Serial.begin(9600);
}

void loop()
{

/************ Implementacao do led Verde -> numero 7 ************/

    int readingVerde = digitalRead(buttonVerdePin);
    if(readingVerde != lastbuttonVerde )
    {
        lastDebounceVerde = millis();
    }
    if((millis() - lastDebounceVerde) > DebounceDelay)
    {
        if(readingVerde != buttonVerde)
        {
            buttonVerde = readingVerde;

            if(buttonVerde == HIGH)
            {
                contVerde = contVerde + 1;
                Serial.print("Button Verde: ");
                Serial.println(contVerde);
                if (contVerde == 1)
                {
                    ledVerde = LOW;
                }
                else if(contVerde == 7)
                {
                    ledVerde = HIGH;
                    contVerde = 0;
                }
            }
        }
    }
    digitalWrite(ledVerdePin, ledVerde);
    lastbuttonVerde = readingVerde;



/************ Implementacao do led Amarelo -> numero 5 ************/

    int readingAmarelo = digitalRead(buttonAmareloPin);
    if(readingAmarelo != lastbuttonAmarelo )
    {
        lastDebounceAmarelo = millis();
    }
    if((millis() - lastDebounceAmarelo) > DebounceDelay)
    {
        if(readingAmarelo != buttonAmarelo)
        {
            buttonAmarelo = readingAmarelo;

            if(buttonAmarelo == HIGH)
            {
                contAmarelo = contAmarelo + 1;
                Serial.print("Button Amarelo: ");
                Serial.println(contAmarelo);
                if (contAmarelo == 1)
                {
                    ledAmarelo = LOW;
                }
                else if(contAmarelo == 5)
                {
                    ledAmarelo = HIGH;
                    contAmarelo = 0;
                }
            }
        }
    }
    digitalWrite(ledAmareloPin, ledAmarelo);
    lastbuttonAmarelo = readingAmarelo;


/************ Implementacao do led vermelho -> RESET ************/
    int readingVermelho = digitalRead(buttonVermelhoPin);
    if(readingVermelho != lastbuttonVermelho )
    {
        lastDebounceVermelho = millis();
    }
    if((millis() - lastDebounceVermelho) > DebounceDelay)
    {
        if(readingVermelho != buttonVermelho)
        {
            buttonVermelho = readingVermelho;

            if(buttonVermelho == HIGH)
            {
                ledVermelho = HIGH;
                buzzer = HIGH;
                contAmarelo = 0;
                contVerde = 0;
              	ledAmarelo = LOW;
              	ledVerde = LOW;
                Serial.println("RESET");
                timereset = millis();
            }
        }
    }
    if((millis() - timereset) > 1000 & ((millis() - timereset) < 2000))
    {
        ledVermelho = LOW;
        buzzer = LOW;
      
    }
  	if((millis() - timereset) > 1300 & ((millis() - timereset) < 2000))
    {
      	ledVermelho = HIGH;
        buzzer = HIGH;
      
    }
  	if((millis() - timereset) > 2000)
    {
        ledVermelho = LOW;
        buzzer = LOW;    
    }
    digitalWrite(buzzerpin, buzzer);
    digitalWrite(ledVermelhoPin, ledVermelho);
    lastbuttonVermelho = readingVermelho;
}

