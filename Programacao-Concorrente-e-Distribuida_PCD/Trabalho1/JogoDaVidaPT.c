//Daiana Kathrin Santana Santos 120.357
//Isadora Rosa de Freitas Muniz 120.431

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <sys/time.h>

#define TAM_TABULEIRO 2048
#define NUM_GERACOES 2000
#define SRAND_VALUE 1985

int **Tabuleiro1, **Tabuleiro2;
int MAX_THREADS = 0;

typedef struct dados
{
    int Num_Thread;
    int Num_Geracao;
} dados;

void inicializa()
{

    int i, j;
    Tabuleiro1 = malloc(TAM_TABULEIRO*sizeof(int*)); // CRIA VETOR DE PONTEIROS
    Tabuleiro2 = malloc(TAM_TABULEIRO*sizeof(int*));

    srand(SRAND_VALUE); // GERA NUMEROS ALEATORIOS
    for(i=0; i<TAM_TABULEIRO; i++)   // CRIAR A MATRIZ
    {
        Tabuleiro1[i] = malloc(TAM_TABULEIRO*sizeof(int));// ALOCA ESPACO DE VETOR DE TAMANHO TAM_TABULEIRO PARA CADA PONTEIRO
        Tabuleiro2[i] = malloc(TAM_TABULEIRO*sizeof(int));

        for(j=0; j<TAM_TABULEIRO; j++)   // PREENCHER A MATRIZ
        {
            Tabuleiro1[i][j] = rand() % 2; // PREENCHE A MATRIZ COM OS VALORES ALEATÓRIOS 1 OU 0
            Tabuleiro2[i][j] = 0; // PREENCHE SEGUNDA MATRIZ SOMENTE COM ZERO
        }
    }
}

int getNeighbors(int i, int j, int** Tabuleiro)
{
    int l_esq, l_meio, l_dir, c_baix, c_meio, c_cim;
    int vivos = 0;

    if(j == 0) c_baix = TAM_TABULEIRO-1;
    else c_baix = j-1;

    c_meio = j;

    c_cim = (j+1) % TAM_TABULEIRO;


    if(i == 0) l_esq = TAM_TABULEIRO-1;
    else l_esq = i-1;

    l_meio = i;

    l_dir = (i+1) % TAM_TABULEIRO;

    vivos += Tabuleiro[l_esq][c_baix];
    vivos += Tabuleiro[l_meio][c_baix];
    vivos += Tabuleiro[l_dir][c_baix];
    vivos += Tabuleiro[l_dir][c_meio];
    vivos += Tabuleiro[l_dir][c_cim];
    vivos += Tabuleiro[l_meio][c_cim];
    vivos += Tabuleiro[l_esq][c_cim];
    vivos += Tabuleiro[l_esq][c_meio];

    return vivos;
}

void setNewGeneration(int **velha, int **nova, int inicio, int fim)
{

    int i, j, vivos;
    for(i=inicio; i<fim; i++)
    {
        for(j=0; j<TAM_TABULEIRO; j++)
        {
            vivos = getNeighbors(i, j, velha); // VE A QUANTIDADE DE VIVOS NOS 8 VIZINHOS

            if(velha[i][j] && vivos < 2) nova[i][j] = 0; // Células vivas com menos de 2 (dois) vizinhas vivas morrem por abandono
            else if(velha[i][j] && (vivos == 3 || vivos == 2)) nova[i][j] = 1; //Cada célula viva com 2 (dois) ou 3 (três) vizinhos deve permanecer viva para a próxima geração
            else if(velha[i][j] && vivos >= 4) nova[i][j] = 0; //Cada célula viva com 4 (quatro) ou mais vizinhos morre por superpopulação.
            else if(!velha[i][j] && vivos == 3) nova[i][j] = 1; //Cada célula morta com exatamente 3 (três) vizinhos deve se tornar viva.
            else nova[i][j] = 0;
        }
    }
}

int getVivos(int **Tabuleiro) // CONTA QUANTIDADE DE VIVOS NO TABULEIRO
{

    int i, j;
    int vivos = 0;

    for(i=0; i<TAM_TABULEIRO; i++)
        for(j=0; j<TAM_TABULEIRO; j++)
            vivos += Tabuleiro[i][j];

    return vivos;
}

void *jogoDaVida(void *info)
{

    dados *info2 = (dados*) info;

    int Num_Thread = (int) info2 ->Num_Thread;
    int NUM_Geracao = (int) info2 ->Num_Geracao;

    int tam = TAM_TABULEIRO/MAX_THREADS;
    int inicio = tam * Num_Thread;
    int fim = tam * (Num_Thread+1);

    if(NUM_Geracao%2) //se i é impar
        setNewGeneration(Tabuleiro1, Tabuleiro2, inicio, fim);
    else //se i é par
        setNewGeneration(Tabuleiro2, Tabuleiro1, inicio, fim);
}

int main(int argc, char *argv[])
{

    MAX_THREADS = atoi(argv[1]);
    printf("Quantidade de threads: %d\n", MAX_THREADS);
    inicializa(); // CRIA E PREENCHE TRABULEIROS 1 E 2

    int vivos=getVivos(Tabuleiro1);
    printf("%d\n", vivos); // MOSTRA A QUANTIDADE DE VIVOS INICIAL


    struct timeval tmp_inicio, tmp_final;
    int tmp;
    gettimeofday(&tmp_inicio, NULL);//INCIA A CONTAGEM DO TEMPO


    int i, th;
    for(i=1; i<=NUM_GERACOES; i++)  //EXECUTA AS GERACOES
    {
        pthread_t vetor[MAX_THREADS]; //VETOR DE THREADS
        dados info[MAX_THREADS]; // ESTRUTURA COM O NUMERO DA THREAD E A GERACAO
        for(th=0; th<MAX_THREADS; th++)
        {
            info[th].Num_Thread = th;
            info[th].Num_Geracao = i;
            pthread_create(&vetor[th], NULL, &jogoDaVida, (void *) &info[th]);
            pthread_join(vetor[th], NULL);
        }
    }

    //VER QUAL EH O TABULEIRO ATUALIZA
    if(NUM_GERACOES%2 == 0) vivos = getVivos(Tabuleiro1);
    else vivos = getVivos(Tabuleiro2);
    printf("%d\n", vivos);

    gettimeofday(&tmp_final, NULL);
    tmp = (int) ( (tmp_final.tv_sec - tmp_inicio.tv_sec) );
    printf("\nTempo decorrido: %d s\n", tmp);

    return 0;
}
