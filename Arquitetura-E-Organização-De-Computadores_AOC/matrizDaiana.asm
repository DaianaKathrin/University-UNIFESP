.data
Mat1: 	.space 512	#PRIMEIRA MATRIZ
Mat2: 	.space 512	#SEGUNDA MATRIZ
MatResult:	.space 512	#MATRIZ RESULTANTE
TamN: 	.asciiz "Qual a dimensao da matriz: "
ElementosMat1:	.asciiz "Digite os numeros da matriz 1:  (1 por linha)\n"
ElementosMat2:	.asciiz "Digite os numeros da matriz 2:  (1 por linha)\n"
Esp:		.asciiz	" "
PulaLinha:		.asciiz "\n"

.text
ProgramaPrincipal:

li $v0,4
la $a0,TamN	
syscall
	
li $v0,5	
syscall		

move $s7,$v0	
mul $s6,$s7,$s7 

##################### LENDO A PRIMEIRA MATRIZ #############################
li $v0,4
la $a0,ElementosMat1 
syscall 


ContinuaInserir1:
	addi 	$v0, $zero, 5 
	syscall

	sw	$v0, Mat1($s0) 
	addi	$s0, $s0, 4	 
	addi	$s6,$s6,-1
	bgt 	$s6,0, ContinuaInserir1	
	

li $s0,0 
mul $s6,$s7,$s7

##################### LENDO A SEGUNDA MATRIZ #############################
li $v0,4
la $a0,ElementosMat2 
syscall 

ContinuaInserir2:

		addi	$v0, $zero, 5
		syscall
		add	$s2, $zero, $v0
		sw	$s2, Mat2($s0) 
		addi	$s0, $s0, 4
		addi	$s6,$s6,-1		
		bgt 	$s6,0, ContinuaInserir2	

##################### CALCULANDO O RESULTADO DA MULTIPLICACAO #############################		
loop_total:

	li $s2,0
	li $s3,0
	li $t0,0	
	move $t6,$s7

MudaLinha: 
	
	move $t2,$s7
	mul $t1,$s7,4 
	move $s6,$s7
	li $s3,0

MudaColuna:
	
	add $t8,$s2,0	
	add $t9,$s3,0	
	li $s0,0	
	li $s1,0	
	move $t2,$s7		
	mul $t1,$s7,4	
	
Multiplica:
			
	lw $a1,Mat1($t8)	
	lw $a2,Mat2($t9)	
	
	mul $s1,$a1,$a2
	add $s0,$s0,$s1			
	add $t8,$t8,4		
	add $t9,$t9,$t1			
	add  $t2,$t2,-1		
		
	bgt $t2,0,Multiplica	
	sw $s0,MatResult($t0)	
	add $t0,$t0,4		
	add $s3,$s3,4		
	add $s6,$s6,-1		
	li $s0,0		
	li $s1,0		
			
	bgt $s6,0,MudaColuna
	add $s2,$s2,$t1				
	add $t6,$t6,-1				
	
	li $s0,0
	li $s1,0
	
	bgt $t6,0,MudaLinha			
	
############################# IMPRESSAO DA MATRIZ #############################
			
	mul $t1,$s7,$s7
	move $t2,$s7
	li $t4,0
	li $t5,0
	li $t6,0
	
	li $v0,4
	la $a0,PulaLinha
	syscall
	
	li $v0,4
	la $a0,PulaLinha
	syscall
				
Imprime:

	lw $t3,MatResult($t5)	
	
	li $v0,1	
	move $a0,$t3
	syscall
		
	add $t4,$t4,1
	add $t6,$t6,1
	add $t5,$t5,4						
	
	li $v0,4		
	la $a0,Esp
	syscall
	
	blt $t4,$s7,Imprime 
	
	li $v0,4		
	la $a0,PulaLinha
	syscall
	
	li $t4,0
	blt $t6,$t1,Imprime
		
	
	li $v0,10
	syscall