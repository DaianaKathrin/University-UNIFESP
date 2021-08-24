/*******************************************************/
/*	COMPILADOR PARA LINGUAGEM C-                   */
/*						        */
/*						       */
/*	Daiana Santos	RA: 120.357	              */
/****************************************************/

#include "globals.h"

#define NO_PARSE FALSE
#define NO_ANALYZE FALSE
#define NO_CODE FALSE
#define NO_ASSMB FALSE

#include "util.h"
#if NO_PARSE
#include "scan.h"
#else
#include "parse.h"
#if !NO_ANALYZE
#include "analyze.h"
#if !NO_CODE
#include "cgen.h"
#if !NO_ASSMB
#include "assmb.h"

#endif
#endif
#endif
#endif

/* allocate global variables */
int lineno = 0;
FILE * source;
FILE * listing;
FILE * code;

/* allocate and set tracing flags */
int EchoSource = FALSE;
int TraceScan = TRUE;
int TraceParse = TRUE;
int TraceAnalyze = TRUE;
int TraceCode = FALSE;

int Error = FALSE;

int main( int argc, char * argv[] )
{ TreeNode * syntaxTree;
  char pgm[120]; /* source code file name */
  if (argc != 2)
    { fprintf(stderr,"usage: %s <filename>\n",argv[0]);
      exit(1);
    }
  strcpy(pgm,argv[1]) ;
  if (strchr (pgm, '.') == NULL)
     strcat(pgm,".cms");
  source = fopen(pgm,"r");
  if (source==NULL)
  { fprintf(stderr,"File %s not found\n",pgm);
    exit(1);
  }
  listing = stdout; /* send listing to screen */
  fprintf(listing,"\nCompilador C menos: %s\n",pgm);
#if NO_PARSE
  while (getToken()!=ENDFILE);
#else
  syntaxTree = parse();
  if (TraceParse) {
    fprintf(listing,"\nArvore Sintatica:\n");
    printTree(syntaxTree);
  }
#if !NO_ANALYZE
 // if (Error)
  //{ 
if (TraceAnalyze) fprintf(listing,"\nConstruindo Tabela de Simbolos...\n");
    buildSymtab(syntaxTree);
    if (TraceAnalyze) fprintf(listing,"\nChecando tipos...\n");
    typeCheck(syntaxTree);
    if (TraceAnalyze) fprintf(listing,"\nChecagem de tipos terminada\n");
 // }
#if !NO_CODE
  if (! Error)
  { 
    fprintf(listing,"\n\n\n           LISTA DE QUADRUPLAS:\n\n");
    gen_quad(syntaxTree);
  }
#if !NO_ASSMB
  GeraAssmb();
  
#endif  
#endif
#endif
#endif
  fclose(source);
  return 0;
}

