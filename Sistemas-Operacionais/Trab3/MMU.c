//Daiana Kathrin Santana Santos 120.357
//Isadora Rosa de Freitas Muniz 120.431
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#define TAM_MAX 8
typedef struct map_virtual_t map_virtual_t;
typedef struct NO NO;
struct map_virtual_t
{
  uint8_t flag_cache:1; //Permite desabilitar o caching da pagina
  uint8_t flag_referenciada:1; //1-(foi referenciada recentemente)
  uint8_t flag_modificada:1; //1-(pagina alterada) 0-(nao alterada)
  uint8_t flag_protecao:3; //0-(leitura/escrita) 1-(leitura) 2-(execucao)
  uint8_t flag_padding:2; // inutilizado,apenas para preenchimento
  uint16_t offset_moldura:12; //Identifica a página real
  uint16_t offset_padding:4; // inutilizado, apenas para preenchimento
  uint16_t offset_frame_number; //Identifica a pagina real
};
struct NO
{
  map_virtual_t item;
  struct NO *prox;
};
//map_virtual_t *busca_map_virtual(uint64_t virtual_addr);
void constroi_map_virtual_t(map_virtual_t* pag, int numero_pag, int moldura_pag)
{
  pag->offset_frame_number = numero_pag;
  pag->offset_moldura = moldura_pag;
}
 
int funcaohash(int pagina)
{
  return abs(pagina % TAM_MAX);
}
int Qual_Pagina(uint64_t end_virtual)
{
  if(end_virtual >=0 && end_virtual <4000)   return 0;
  else if(end_virtual <8000) return 1;
  else if(end_virtual <12000)    return 2;
  else if(end_virtual <16000)    return 3;
  else if(end_virtual <20000)    return 4;
  else if(end_virtual <24000)    return 5;
  else if(end_virtual <28000)    return 6;
  else if(end_virtual <32000)    return 7;
  else if(end_virtual <36000)    return 8;
  else if(end_virtual <40000)    return 9;
  else if(end_virtual <44000)    return 10;
  else if(end_virtual <48000)    return 11;
  else if(end_virtual <52000)    return 12;
  else if(end_virtual <56000)    return 13;
  else if(end_virtual <60000)    return 14;
  else if(end_virtual <64000)    return 15;
  else
  {
      printf("\npage miss\n\n");
      return -1;
  }
}
void inicializa(NO **HASH)
{
  int i;
  for(i=0; i<TAM_MAX; i++)
      HASH[i]=NULL;
}
map_virtual_t* busca_map_virtual(NO **HASH, uint64_t end_virtual)
{
  int num_pag = Qual_Pagina(end_virtual);
  if(num_pag==-1)  return NULL;
  int pos = funcaohash(num_pag);
  NO *lista = HASH[pos];
  while (lista != NULL)
  {
      if (lista->item.offset_frame_number == num_pag)
      {
          return &lista->item;
      } // Se encontrou retorna o valor do numero da pagina
      lista = lista->prox;
  }
  return NULL;
}
void insere(NO **HASH, map_virtual_t item)
{
  int pos = funcaohash(item.offset_frame_number);
  NO **lista = &HASH[pos];
  if (*lista == NULL)
  {
      *lista = (NO *) malloc(sizeof(NO));
      if (*lista == NULL)
      {
          printf("\nErro alocacao memoria!");
          exit(1);
      }
      (*lista)->item=item;
      (*lista)->prox=NULL;
 
      printf("\n Inserido HASH, na posicao %d, pagina %d",pos, item.offset_frame_number);
  }
  else   // Se ocorreu colisao
  {
      NO *guarda= HASH[pos]; // guardando posicao inicial ponteiro
      while ((*lista)->prox != NULL)
          // Caminha para fim da lista caso contenha mais de 2 itens
          *lista=(*lista)->prox;
 
      (*lista)->prox=(NO *) malloc(sizeof(NO));
      if ((*lista)->prox == NULL)
      {
          printf("\nErro alocacao memoria!");
          exit(1);
      }
 
      *lista=(*lista)->prox;
      (*lista)->item=item;
      (*lista)->prox=NULL;
      printf("\n Inserido HASH, na posicao %d, pagina %d",pos, item.offset_frame_number);
 
      HASH[pos]=guarda; // retornando ponteiro para a posiçao inicial
  }
}
 
void executa_teste(NO **HASH)
{
  uint64_t end_virtual;
  printf("\n\n-------------------TESTE--------------------------\n");
  while(1)
  {
      printf("\nInsira o endereco que deseja BUSCAR ou (-1) se quiser parar: ");
      scanf("%ld", &end_virtual);
 
      if(end_virtual==-1) break;
 
      map_virtual_t* busca_end = busca_map_virtual(HASH, end_virtual);
      if(busca_end != NULL)
      {
          printf("\nA pagina do endereco requisitado eh %d, armazenado no hash[%d]\n\n\n", busca_end->offset_frame_number, funcaohash(busca_end->offset_frame_number));
      }
 
  }
}
 
int main()
{
printf("/*************************************************/\n");
 printf("/*************************************************/\n");
 printf("/***UNIFESP - Instituto de Ciência e Tecnologia***/\n");
 printf("/***************2020-1ºSEMESTRE*******************/\n");
 printf("/************Sistemas Operacionais****************/\n");
 printf("/******Daiana Kathrin Santana Santos 120.357******/\n");
 printf("/******Isadora Rosa de Freitas Muniz 120.431******/\n");
 printf("/*************************************************/\n");
 printf("/*************************************************/\n\n\n");
  map_virtual_t end0, end1, end2, end3, end4, end5, end6, end7, end8, end9, end10, end11, end12, end13, end14, end15;
  NO *HASH[TAM_MAX];
  inicializa(HASH);
  constroi_map_virtual_t(&end0, 0, 10);
  constroi_map_virtual_t(&end1, 1, 20);
  constroi_map_virtual_t(&end2, 2, 15);
  constroi_map_virtual_t(&end3, 3, 25);
  constroi_map_virtual_t(&end4, 4, 30);
  constroi_map_virtual_t(&end5, 5, 45);
  constroi_map_virtual_t(&end6, 6, 55);
  constroi_map_virtual_t(&end7, 7, 40);
  constroi_map_virtual_t(&end8, 8, 60);
  constroi_map_virtual_t(&end9, 9, 70);
  constroi_map_virtual_t(&end10, 10, 65);
  constroi_map_virtual_t(&end11, 11, 75);
  constroi_map_virtual_t(&end12, 12, 90);
  constroi_map_virtual_t(&end13, 13, 56);
  constroi_map_virtual_t(&end14, 14, 80);
  constroi_map_virtual_t(&end15, 15, 84);
 
 
  insere(HASH, end0);
  insere(HASH, end1);
  insere(HASH, end2);
  insere(HASH, end3);
  insere(HASH, end4);
  insere(HASH, end5);
  insere(HASH, end6);
  insere(HASH, end7);
  insere(HASH, end8);
  insere(HASH, end9);
  insere(HASH, end10);
  insere(HASH, end11);
  insere(HASH, end12);
  insere(HASH, end13);
  insere(HASH, end14);
  insere(HASH, end15);
 
 
  executa_teste(HASH);
 
 
  return 0;
 
}
 
 
 



