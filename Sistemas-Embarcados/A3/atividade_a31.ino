/****** Daiana Kathrin Santana Santos *******/
/*************** RA: 120.357 ***************/

const int LEDpin1 = 3;
const int LEDpin2 = 5;
const int LEDpin3 = 6;
const int LEDpin4 = 9;
const int LEDpin5 = 10;
const int LEDpin6 = 11;
int pwm = 0;
  
void setup()
{
  pinMode(LEDpin1, OUTPUT);
  pinMode(LEDpin2, OUTPUT);
  pinMode(LEDpin3, OUTPUT);
  pinMode(LEDpin4, OUTPUT);
  pinMode(LEDpin5, OUTPUT);
  pinMode(LEDpin6, OUTPUT);
}

void loop()
{
  for (pwm=0;pwm<=255;pwm++){
  	analogWrite(LEDpin1, pwm);
    delay(5);
  
  }
  for (pwm=0;pwm<=255;pwm++){
  	analogWrite(LEDpin2, pwm);
    delay(5);
  
  }
  for (pwm=0;pwm<=255;pwm++){
  	analogWrite(LEDpin3, pwm);
    delay(5);
  
  }
  for (pwm=0;pwm<=255;pwm++){
  	analogWrite(LEDpin4, pwm);
    delay(5);
  
  }
  for (pwm=0;pwm<=255;pwm++){
  	analogWrite(LEDpin5, pwm);
    delay(5);
  
  }
  for (pwm=0;pwm<=255;pwm++){
  	analogWrite(LEDpin6, pwm);
    delay(5);
  
  }
  for (pwm=255;pwm>=0;pwm--){
  	analogWrite(LEDpin6, pwm);
    delay(5);
  
  }
  for (pwm=255;pwm>=0;pwm--){
  	analogWrite(LEDpin5, pwm);
    delay(5);
  
  }
  for (pwm=255;pwm>=0;pwm--){
  	analogWrite(LEDpin4, pwm);
    delay(5);
  
  }
  for (pwm=255;pwm>=0;pwm--){
  	analogWrite(LEDpin3, pwm);
    delay(5);
  
  }
  for (pwm=255;pwm>=0;pwm--){
  	analogWrite(LEDpin2, pwm);
    delay(5);
  
  }
  for (pwm=255;pwm>=0;pwm--){
  	analogWrite(LEDpin1, pwm);
    delay(5);
  
  }

}