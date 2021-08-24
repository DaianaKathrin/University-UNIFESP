//Daiana Kathrin Santana Santos 120.357
//Isadora Rosa de Freitas Muniz 120.431

#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(int argc, char *argv[])
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

    printf("Digite o seu comando: ");

    int i, cnt=0, VerificaPipe=0, cnt_cmd=0, Indices_cmd[20], fd[100][2], arqIN, arqOUT, n, aux, j;
    char comando[500];
    char **Matriz_cmd= (char**) calloc(20*sizeof(char**), 1); //MATRIZ DE COMANDOS
    char* token;
    pid_t PID;

    scanf("%[^\n]s", comando); //LER COMANDO
    token = strtok(comando, " "); //PEGAR TOKENS SEPARADO POR ESPACO

    for(i=0; i<100; i++)
    {
        pipe(fd[i]); //CRIA PIPE
    }

    if(token)
    {
        while(token!=NULL)
        {
            Matriz_cmd[cnt] = (char*) calloc(sizeof(token) * sizeof(char*), 1); //LINHA DA MATRIZ NO TAMANHO DE CARACTERS DO TOKEN
            if(VerificaPipe==0)  //TOKEN EH UMA APLICACAO
            {
                strcpy(Matriz_cmd[cnt], token); //COPIA TOKEN NA MATRIZ
                Indices_cmd[cnt_cmd] = cnt; //COPIA INDICE DA MATRIZ QUE CONTEM A APLICACAO
                cnt_cmd++; //AUMENTA NUMEROS DE APLICACOES
                VerificaPipe=1; //PROXIMO TOKEN NAO EH UMA APLICACAO
            }
            else  //TOKEN EH UM PARAMETRO OU OPERADOR
            {
                if(strcmp(token, "|") == 0)  //SE FOR OPERADOR PIPE
                {
                    Matriz_cmd[cnt] = NULL;
                    VerificaPipe=0; //PROXIMO TOKEN EH UMA APLICACAO
                }
                else strcpy(Matriz_cmd[cnt], token); //EH UM PARAMETRO
            }
            token = strtok(NULL," "); //PEGA PROXIMO TOKEN
            cnt++; //PROXIMA POSICAO DA MATRIZ
        }
    }
    else
    {
        printf("Nao ha comando");
    }




    for(i=0; i<cnt_cmd; i++)
    {
    printf("Executando o comando %s\n",Matriz_cmd[Indices_cmd[i]]);

        PID = fork();
        if (PID == 0)  //EXECUTANDO O PROCESSO FILHO
        {
            n=Indices_cmd[i];
            while(Matriz_cmd[n] != NULL) //LACO ENQUANTO NAO EH FIM DA MATRIZ OU PIPE
            {
                if (strcmp(Matriz_cmd[n], "<") == 0) //ARQUIVO DE ENTRADA
                {
                    arqIN = open(Matriz_cmd[n+1], O_RDONLY, 0644);
                    close(STDIN_FILENO);
                    dup2(arqIN, STDIN_FILENO);
                    Matriz_cmd[n] = NULL;
                    printf("Abrindo arquivo %s\n", Matriz_cmd[n+1]);
                }
                else if (strcmp(Matriz_cmd[n], ">") == 0) //ARQUIVO DE SAIDA
                {
                    printf("Sobrescrevendo/Criando arquivo %s\n", Matriz_cmd[n+1]);
                    arqOUT = open(Matriz_cmd[n+1], O_CREAT | O_RDWR | O_TRUNC, 0644);
                    close(STDOUT_FILENO);
                    dup2(arqOUT, STDOUT_FILENO);
                    Matriz_cmd[n] = NULL;

                }
                else if (strcmp(Matriz_cmd[n], ">>") == 0) //ARQUIVO DE SAIDA
                {
                    printf("Abrindo arquivo %s\n", Matriz_cmd[n+1]);
                    arqOUT = open(Matriz_cmd[n+1], O_CREAT | O_RDWR | O_APPEND, 0644);
                    close(STDOUT_FILENO);
                    dup2(arqOUT, STDOUT_FILENO);
                    Matriz_cmd[n] = NULL;
                    printf("Abrindo arquivo %s\n", Matriz_cmd[n+1]);
                }
                n++;
            }
            if(i!=0)  // APLICACAO SEGUIDA DO PIPE
            {
                close(fd[i-1][1]);
                dup2(fd[i-1][0], STDIN_FILENO);
                close(fd[i-1][0]);
            }
            if(i!=cnt_cmd-1)  // NAO EH O ULTIMO COMANDO
            {
                close(fd[i][0]);
                dup2(fd[i][1], STDOUT_FILENO);
                close(fd[i][1]);
            }

            execvp(Matriz_cmd[Indices_cmd[i]], &Matriz_cmd[Indices_cmd[i]]); //EXECUTA APLICACAO
            close(arqOUT);
            close(arqIN);

        }
        else     // ESTA EXECUTANDO PAI
        {
            if(i>0)
            {
                close(fd[i-1][0]);
                close(fd[i-1][1]);
            }
            waitpid(-1, NULL, 0);
        }
    }

    printf("\n/******Matriz de Comandos******/\n");
    for(i=0; i<=cnt; i++)
    {
        aux=0;
        printf("linha %d:\t%s", i, Matriz_cmd[i]);
        for(j=0; j<=cnt_cmd; j++){
            if(i==Indices_cmd[j] && aux==0) {
            printf("\t\t\t Eh uma nova aplicacao\n");
            aux=1;
            }
            
            else if(Matriz_cmd[i]==NULL && aux==0) {
            printf("\t\t\t fim desta aplicacao\n");
            aux=1;
            }
            
            else if(aux==0){
            printf("\t\t\t Eh um parametro da aplicacao\n");
            aux=1;
            }

        }

    }
    printf("/*****************************/\n");
    return 0;
}

