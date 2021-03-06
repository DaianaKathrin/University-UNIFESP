/*******************************************************/
/*	COMPILADOR PARA LINGUAGEM C-                   */
/*						        */
/*						       */
/*	Daiana Santos	RA: 120.357	              */
/****************************************************/


#ifndef _GLOBALS_H_
#define _GLOBALS_H_

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>



#ifndef YYPARSER


#include "Cmenos.tab.h"


#define ENDFILE 0

#endif

#ifndef FALSE
#define FALSE 0
#endif

#ifndef TRUE
#define TRUE 1
#endif

#define MAXRESERVED 6

extern FILE* source; 
extern FILE* listing; 
extern FILE* code; 

extern int lineno; 


typedef int TokenType;

typedef enum
{
	statementK, expressionK 
} NodeKind;

typedef enum
{
	ifK, whileK, assignK, returnK

} StatementKind;

typedef enum
{
	variableK, paramK, functionK, callK, 
   operationK, activationK, constantK, idK, 
   vectorK, vectorIdK, typeK, numberK

} ExpressionIdentifier;

typedef enum {INTTYPE, VOIDTYPE, BOOLTYPE} dataTypes;

typedef enum {VAR, FUN} IDTypes;

/* ExpType is used for type checking */
typedef enum
{
	voidK, integerK, booleanK
	
} ExpressionType;


#define MAXCHILDREN 3


typedef struct treeNode
{ 
	 struct treeNode * child[MAXCHILDREN];
     struct treeNode * sibling;
     int lineno;
     int size;
     int add;
     NodeKind nodekind;

     union 
     { 
		StatementKind stmt; 
        ExpressionIdentifier exp;
     } kind;

     union 
     { 
	    TokenType op;
        int val;
      //   int len;
        char* name; 
      //   char* scope;	
     } attr;
     dataTypes type; /* for type checking of exps */
} TreeNode;


extern int EchoSource;

extern int TraceScan;

extern int TraceParse;

extern int TraceAnalyze;

extern int TraceCode;

extern int Error; 

#endif
