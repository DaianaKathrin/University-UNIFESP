/*************************************************/
/*************************************************/
/***UNIFESP - Instituto de Ciência e Tecnologia***/
/***************2020-2ºSEMESTRE*******************/
/************Redes de Computadores****************/
/******Daiana Kathrin Santana Santos 120.357******/
/******Isadora Rosa de Freitas Muniz 120.431******/
/*************************************************/
/*************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <errno.h>
#include <pthread.h>

#define TAMcom  1000
#define TAMreq  1024
#define TAMmet  128
#define TAMarq  256
#define TAMbloc 4096

struct TypeReq
{
    char metodo[TAMmet];
    char arquivo[TAMarq];
    char conteudo[TAMcom];
};

struct TypeThread
{
    pthread_t tid;
    int c;
    struct sockaddr_in caddr;
};

void CopyRequisicao(char *ReqOrig, struct TypeReq *req)
{
    char aux;
    if(strstr(ReqOrig, "APPEND")!=NULL)
        sscanf(ReqOrig, "%s %[\"] %[^\"] %[\"] %s\n", req->metodo, &aux, req->conteudo, &aux, req->arquivo);
    else{
        sscanf(ReqOrig, "%s %s\n", req->metodo, req->arquivo);}
}

void *OrganizaCliente(void *args)
{
    struct TypeThread a = *(struct TypeThread *)args;
    int c = a.c;
    struct sockaddr_in caddr = a.caddr;

    printf("Servidor conectado com o cliente %s:%d\n", inet_ntoa(caddr.sin_addr), ntohs(caddr.sin_port));

    char requisicao[TAMreq], resposta[TAMreq];
    char bloco[TAMbloc];
    int Aux_recv, Aux_metodo;
    struct TypeReq req;
    
    bzero(requisicao, TAMreq);
    Aux_recv = recv(c, requisicao, TAMreq, 0);
    
    if (Aux_recv > 0)
    {
        bzero(resposta, TAMreq);
        bzero(&req, sizeof(struct TypeThread));  
          	
        CopyRequisicao(requisicao, &req);
        /**********************METODO GET**********************/
        if (strcmp(req.metodo, "GET") == 0)
        {
            printf("Metodo:'%s', arquivo:'%s'\n",req.metodo,req.arquivo);
            Aux_metodo = open(req.arquivo, O_RDONLY);
            if (Aux_metodo < 0)
            {
                sprintf(resposta, "%d %s\n", errno, strerror(errno));
                send(c, resposta, strlen(resposta), 0);
            }
            else
            {
                sprintf(resposta, "%s %s\n","200", "OK");
                send(c, resposta, strlen(resposta), 0);
                do
                {
                    bzero(bloco, TAMbloc);                
                    Aux_recv = read(Aux_metodo, bloco, TAMbloc);

                    if (Aux_recv > 0)
                    {
                        send(c, bloco, Aux_recv, 0);
                    }
                }
                while(Aux_recv > 0);
            }
            close(Aux_metodo);
        }/******************METODO CREATE******************/
        else if(strcmp(req.metodo, "CREATE") == 0)
        {
            printf("Metodo:'%s', arquivo:'%s'\n",req.metodo, req.arquivo);

            Aux_metodo = open(req.arquivo, O_CREAT, 0777);
            if (Aux_metodo < 0)
            {
                sprintf(resposta, "%d %s\n",errno, strerror(errno));
                send(c, resposta, strlen(resposta), 0);
            }
            else
            {
                sprintf(resposta, "%s %s\n", "200", "OK");
                send(c, resposta, strlen(resposta), 0);
            }

            close(Aux_metodo);

        }/****************METODO REMOVE****************/
        else if(strcmp(req.metodo, "REMOVE") == 0)
        {
            printf("Metodo:'%s', arquivo:'%s'\n",req.metodo,req.arquivo);
            Aux_metodo = remove(req.arquivo);
            if (Aux_metodo < 0)
            {
                sprintf(resposta, "%d %s\n", errno, strerror(errno));
                send(c, resposta, strlen(resposta), 0);
            }
            else
            {
                sprintf(resposta, "%s %s\n","200", "OK");
                send(c, resposta, strlen(resposta), 0);
            }

            close(Aux_metodo);
        }/****************METODO APPEND****************/
        else if(strcmp(req.metodo, "APPEND") == 0)
        {
            printf("Metodo:'%s', arquivo:'%s'\n", req.metodo, req.arquivo);
            Aux_metodo = open(req.arquivo, O_RDWR|O_APPEND);
            size_t p = strlen(req.conteudo);
            
	
            if (Aux_metodo > 0 && write(Aux_metodo, req.conteudo, p) > 0)
            {
                sprintf(resposta, "%s %s\n","200", "OK");
                send(c, resposta, strlen(resposta), 0);
            }
            else
            {
            	sprintf(resposta, "%d %s\n", errno, strerror(errno));
            	send(c, resposta, strlen(resposta), 0);
            }
            close(Aux_metodo);
        }/*************METODO NAO SUPORTADO************/
        else
        {
            sprintf(resposta, "%s %s\n","-1", "Metodo nao suportado");
            send(c, resposta, strlen(resposta), 0);
        }
    }
    close(c);
    pthread_exit(NULL);
}

int main(int argc, char **argv)
{

    if (argc !=2)
    {
        printf("Uso: %s <porta>\n", argv[0]);
        return 0;
    }
    /*********************socket*********************/
    int ls;
    ls = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if(ls==-1)
    {
        perror("socket()");
    }
    /*********************bind*********************/
    struct sockaddr_in saddr;
    saddr.sin_family = AF_INET;
    saddr.sin_port = htons(atoi(argv[1]));
    saddr.sin_addr.s_addr = INADDR_ANY;
    if (bind(ls, (struct sockaddr *)&saddr, sizeof(saddr)) ==-1)
    {
        perror("bind()");
        close(ls);
        return -1;
    }
    /*****************listen*****************/
    if (listen(ls, TAMcom) ==-1)
    {
        perror("listen()");
        close(ls);
        return -1;
    }
    int c;
    struct sockaddr_in caddr;
    socklen_t lenc;
    struct TypeThread args[TAMcom];
    while (1)
    {
        /*********************accept***********************/
        lenc = sizeof(caddr);
        c = accept(ls, (struct sockaddr *)&caddr, &lenc);
        if (c ==-1)
        {
            perror("accept()");
            close(c);
            continue;
        }
        /*******************recv e send*********************/
        args[c].c = c;
        args[c].caddr = caddr;
        pthread_create(&args[c].tid, NULL, OrganizaCliente, &args[c]);
    }
    int i=0;
    while (i < TAMcom)
    {
        pthread_join(args[i].tid, NULL);
    }
    return 0;
}
