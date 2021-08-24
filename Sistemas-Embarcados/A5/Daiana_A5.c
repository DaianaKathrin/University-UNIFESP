/*************Daiana Kathrin Santana Santos *************/
/********************** RA: 120.357 *********************/

void main(){
                          //  "0"  "1"  "2"  "3"  "4"  "5"  "6"  "7"  "8"  "9"
   unsigned char VetNum[] = {0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F};
   /* Variavel do tipo vetor que armazena os valores correspondentes ao numero
   para ser mostrado no display de 7 segmentos */

   unsigned char StatusBotao; // Variavel de travamento do incremento.
   unsigned int  Cont;   // Variavel de armazenamento do contador.
   unsigned int  ContValor;      // Variavel auxiliar para exibido do contador.

   ADCON1 = 0x0f;       // Configura todos canais como Digital.

   TRISB.RB0=1;         // Define o pino RB0 do PORTB como entrada.

   TRISA.RA2=0;         // Define o pino RA2 do PORTA como saida(Selecao Display 1).
   TRISA.RA3=0;         // Define o pino RA3 do PORTA como saida(Selecao Display 2).
   TRISA.RA4=0;         // Define o pino RA4 do PORTA como saida(Selecao Display 3).
   TRISA.RA5=0;         // Define o pino RA5 do PORTA como saida(Selecao Display 4).

   TRISB.RB6=0;          // led b6 como saida
   TRISB.RB7=0;          // led b7 como saida

   TRISC.RC1=0;          // Buzzer como saida

   TRISD = 0;           // Define todos os pinos Do PORTD como saida.

   StatusBotao=0;      // Inicializa a variavel com o valor 0.
   Cont=-1;        // Inicializa a variavel com o valor -1.

   while(1){            // Aqui definimos uma condicao sempre verdadeira como parametro, portanto todo o bloco sera repetido indefinidamente.

      // Le Tecla E Incrementa Contador.
      if((PORTB.RB0==0)&&(StatusBotao==0)){   // Incrementa somente uma vez quando a tecla for pressionada.
         StatusBotao=1;                       // Variavel de travamento do incremento.
         Cont++;                         // Esse operador aritmetico(++) realiza o mesmo que variavel = variavel + 1.
         if(Cont>9999){ // Define o valor maximo a ser mostrado no displays como 9999.
            Cont=9999;
         }
      }
      if((PORTB.RB0==1)&&(StatusBotao==1)){   // Volta a disponibilizar a op??o de incremento quando a tecla for solta.
         StatusBotao=0;
      }

      ContValor = Cont;                   // Coloca o conteudo da variavel do contador na varaivel auxiliar.

      // Mostra valor da unidade.
      PORTD = VetNum[ContValor%10];              // Pega modulo da divisao por 10 e coloca o valor no PORTD.
      PORTA.RA5 = 1;                           // Liga o transistor associado ao display 1.
      Delay_ms(2);                             // Delay para escrita no display.
      PORTA.RA5 = 0;                           // Desliga o transistor associado ao display 1.
      ContValor/=10;                             // Divide variavel por 10 para definir a dezena.
      // Mostra valor da dezena.
      PORTD = VetNum[ContValor%10];
      PORTA.RA4 = 1;
      Delay_ms(2);
      PORTA.RA4 = 0;
      ContValor/=10;
      // Mostra valor da centena.
      PORTD = VetNum[ContValor%10];
      PORTA.RA3 = 1;
      Delay_ms(2);
      PORTA.RA3 = 0;
      ContValor/=10;
      // Mostra valor do milhar.
      PORTD = VetNum[ContValor%10];
      PORTA.RA2 = 1;
      Delay_ms(2);
      PORTA.RA2 = 0;


      if((Cont%5 == 0) || (Cont%7 == 0))
      {
       PORTC.RC1=1;                      //aciona buzzer
      }
      else{
         PORTC.RC1=0;                    //desliga buzzer
      }
      if(Cont%5 == 0)
      {
       PORTB.RB6=1;                      //liga led b6 se for multiplo de 5
      }
      else{
         PORTB.RB6=0;
      }
      if(Cont%7 == 0)
      {
       PORTB.RB7=1;                      //liga led b7 se for multiplo de 7
      }
      else{
         PORTB.RB7=0;
      }
   }
}