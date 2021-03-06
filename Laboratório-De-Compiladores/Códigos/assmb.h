/*******************************************************/
/*	COMPILADOR PARA LINGUAGEM C-                   */
/*						        */
/*						       */
/*	Daiana Santos	RA: 120.357	              */
/****************************************************/

#ifndef _ASSMB_H_
#define _ASSMB_H_

void GeraAssmb(void);

typedef struct nodeassmb {
    typeQuad type;
    char *name;
    int value;

}assmbNode;

typedef enum {
    NOP,
    HALT,
    WAIT,
    SW,
    LW,
    LI,
    MOVE,
    ADD,
    SUBI,
    MULT,
    DIVI,
    LABEL,
    BEQ,
    BNE,
    SET,
    SDT,
    SGT,
    SGE,
    SLT,
    SLE,
    JUMP,
    JAL,
    JR,
    IN,
    OUT
    
} OPCODE;

struct t_assmb {

    OPCODE opcode;
    assmbNode op1;
    assmbNode op2;
    assmbNode op3;

    struct t_assmb *proximo;
};

typedef struct t_assmb INSTRU;

typedef struct {
    INSTRU *primeiro;
    INSTRU *ultimo;
    int tamanho;

} lista_ASSMB;

//Variavel que contem a lista encadeada de quadruplas
lista_ASSMB *listaAsmb;

#endif
