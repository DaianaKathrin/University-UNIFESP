/*******************************************************/
/*	COMPILADOR PARA LINGUAGEM C-                   */
/*						        */
/*						       */
/*	Daiana Santos	RA: 120.357	              */
/****************************************************/

#include "globals.h"
#include "cgen.h"
#include "assmb.h"
#include "exec.h"
#include <stdio.h>
#include <string.h>

#define MAX 10000

void GeraExec(INSTRU *aux){

	int PC = 0;
	int vet_linhas[MAX];
	int opcode;
	int formato;
	int val_op1;
	int val_op2;
	int val_op3;

	printf( "\n\nExecutavel: \n");
	printf( "module MEMORIA_INSTRUCAO(\n");
	printf( "	input [11:0] PC,\n");
	printf( "	output wire [31:0] INSTRUCAO\n);\n");
	printf( "	wire [31:0] memoria[511:0];\n\n");


	while(aux != NULL){

		printf("	assign memoria[%d]=", PC);
		switch (aux->opcode){
			case NOP:
				opcode = 23;
				formato = 4;
				val_op1 = 0;
				break;
			

			case HALT:
				opcode = 21;
				formato = 4;
				val_op1 = 0;
				break;
			

			case WAIT:
				opcode = 22;
				formato = 4;
				val_op1 = 0;
				break;
			

			case SW:
				opcode = 18;
				formato = 2;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = 0;
				break;
			

			case LW:
				opcode = 16;
				formato = 2;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = 0;
				break;
			

			case LI:
				opcode = 17;
				formato = 3;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				break;
			

			case MOVE:
				opcode = 19;
				formato = 2;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = 0;
				break;
			

			case ADD:
				opcode = 1;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case SUB:
				opcode = 2;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case MULT:
				opcode = 3;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case DIV:
				opcode = 4;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case LABEL:
				vet_linhas[aux->op1.value] = PC;
				opcode = 23;
				formato = 4;
				val_op1 = 0;
				break;
			

			case BEQ:
				opcode = 11;
				formato = 2;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case BNE:
				opcode = 12;
				formato = 2;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case SET:
				opcode = 5;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case SDT:
				opcode = 6;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case SGT:
				opcode = 7;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case SGE:
				opcode = 8;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;

			case SLT:
				opcode = 9;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case SLE:

				opcode = 10;
				formato = 1;
				val_op1 = aux->op1.value;
				val_op2 = aux->op2.value;
				val_op3 = aux->op3.value;
				break;
			

			case JUMP:
				opcode = 13;
				formato = 4;
				val_op1 = vet_linhas[aux->op1.value];
				val_op2 = 0;
				break;			
			

			case JAL:
				opcode = 15;
				formato = 4;
				val_op1 = vet_linhas[aux->op1.value];
				val_op2 = 0;
				break;
			
			case JR:
				opcode = 14;
				formato = 3;
				val_op1 = aux->op1.value;
				val_op2 = 0;
				break;
			

			case IN:
				opcode = 20;
				formato = 4;
				val_op1 = 0;
				break;
			

			case OUT:
				opcode = 24;
				formato = 3;
				val_op1 = aux->op1.value;
				val_op2 = 0;
				break;	


		}

		printf("{5'd%d, ", opcode);
		if(formato == 1){
			printf("5'd%d, 5'd%d, 5'd%d, 12'd0 }\n", val_op1, val_op2, val_op3);
		}else if(formato == 2){
			printf("5'd%d, 5'd%d, 17'd%d }\n", val_op1, val_op2, val_op3);
		}else if(formato == 3){
			printf("5'd%d, 22'd%d }\n", val_op1, val_op2);
		}else{
			printf("27'd%d }\n", val_op1);
		}

		PC++;
		aux = aux->proximo;
	}

	printf("\n	assign INSTRUCAO = memoria [PC]; \n\nendmodule\n");
	printf("\n\n         *** EXECUTAVEL GERADO!!! ***\n\n");
}
