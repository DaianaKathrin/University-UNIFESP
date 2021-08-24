
	CREATE TABLE ACESSO(

    	login varchar(20),
    	senha integer,    
    	nome  varchar(20),
    	telefone varchar(20),
    	endereco varchar(20),
    	tipoAcesso varchar(20),

    	PRIMARY KEY (login, senha)
    
	);

	CREATE TABLE VENDA(

    	IDvenda integer,
    	preco integer,
    	titulo varchar(20),
    	login varchar(20),
    	senha integer,
   	 
    	PRIMARY KEY (IDvenda),
    	FOREIGN KEY (login, senha) REFERENCES ACESSO (login, senha)

	);
    
	CREATE TABLE PRODUTO(

    	IDproduto integer,
    	modelo varchar(20),
    	marca varchar(20),
    	cor varchar(20),
    	valor integer,

    	PRIMARY KEY (IDproduto)
	);
    
	CREATE TABLE PAGAMENTO(

    	IDpagamento integer,
    	formaPagamento varchar(20),
    	login varchar(20),
    	senha integer,

    	PRIMARY KEY (IDpagamento),
    	FOREIGN KEY (login, senha) REFERENCES ACESSO (login, senha)
    
	);
    
	CREATE TABLE ENTREGA(

    	IDentrega integer,
    	enderecoSaida varchar(20),
    	enderecoChegada varchar(20),
    	tempo integer,
    	login varchar(20),
    	senha integer,

    	PRIMARY KEY (IDentrega),
    	FOREIGN KEY (login, senha) REFERENCES ACESSO (login, senha)

	);
    
	CREATE TABLE ADMINISTRADOR(

    	login varchar(20),
    	senha integer,
    	codigoAcesso integer,
    	CPFadm varchar(20),

    	PRIMARY KEY (login, senha),
    	FOREIGN KEY (login, senha) REFERENCES ACESSO (login, senha)
	);
    
	CREATE TABLE CLIENTE(

    	login varchar(20),
    	senha integer,
    	numeroCompra integer,
    	CPFcliente varchar(20),

    	PRIMARY KEY (login, senha),
    	FOREIGN KEY (login, senha) REFERENCES ACESSO (login, senha)
    
	);
    
	CREATE TABLE VENDEDOR(

    	login varchar(20),
    	senha integer,
    	IDvenda integer,
    	CPFvendedor varchar(20),

    	PRIMARY KEY (login, senha),
    	FOREIGN KEY (login, senha) REFERENCES ACESSO (login, senha)

	);
    
	CREATE TABLE TRANSPORTADORA(

    	login varchar(20),
    	senha integer,
    	tipo varchar(20),
    	CNPJtransportadora varchar(20),

    	PRIMARY KEY (login, senha),
    	FOREIGN KEY (login, senha) REFERENCES ACESSO (login, senha)

	);
    
	CREATE TABLE SMARTPHONE(

    	IDproduto integer,
    	memoria  integer,

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)
    
	);
    
	CREATE TABLE NOTEBOOK(

    	IDproduto integer,
    	ram integer,
    	processador varchar(20),

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)
	);
    
	CREATE TABLE DESKTOP(

    	IDproduto integer,
    	tamanho integer,
    	memoria integer,

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)
	);
    
	CREATE TABLE TABLET(

    	IDproduto integer,
    	memoria integer,
    	polegadaTela integer,

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)

	);
    
	CREATE TABLE IMPRESSORA(

    	IDproduto integer,
    	funcoes varchar(20),

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)

	);
    
	CREATE TABLE VIDEOGAME(

    	IDproduto integer,
    	memoria integer,
    	marca varchar(20),

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)

	);
    
	CREATE TABLE ACESSORIO(

    	IDproduto integer,
    	TipoAcessorio varchar(20),
    	quantidade integer,

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)

	);
    
	CREATE TABLE TECLADO(

    	IDproduto integer,
    	tamanho  integer,

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)

	);
    
	CREATE TABLE MOUSE(

    	IDproduto integer,
    	marca varchar(20),

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)

	);
    
	CREATE TABLE MONITOR(

    	IDproduto integer,
    	TamanhoTela integer,
   	 

    	PRIMARY KEY (IDproduto),
    	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)

	);
    
	CREATE TABLE FISCALIZA(

    	login varchar(20),
    	IDvenda integer,

    	PRIMARY KEY (login, IDvenda),
    	FOREIGN KEY (login) REFERENCES ADMINISTRADOR (login),
    	FOREIGN KEY (IDvenda) REFERENCES VENDA (IDvenda)
    	 
	);

    
   	 
	CREATE TABLE AVALIAÇÃO(

    	loginC varchar(20),
    	loginA varchar(20),
    	cometario text,
    	pontuacao integer,

    	PRIMARY KEY (loginC, loginA),
    	FOREIGN KEY (loginC) REFERENCES CLIENTE (login),
    	FOREIGN KEY (loginA) REFERENCES ADMINISTRADOR (login)
	);
    
	CREATE TABLE EDITAR(

    	login varchar(20),
    	IDvenda integer,
    	DataInicio date,
    	DataEdicao date,
    	DataFim date,

    	PRIMARY KEY (IDvenda, login),
    	FOREIGN KEY (IDvenda) REFERENCES VENDA (IDvenda),
    	FOREIGN KEY (login) REFERENCES VENDEDOR (login)

	);
    
	CREATE TABLE RECEBE(

    	login varchar(20),
    	IDpagamento integer,

    	PRIMARY KEY (IDpagamento, login),
    	FOREIGN KEY (IDpagamento) REFERENCES PAGAMENTO (IDpagamento),
    	FOREIGN KEY (login) REFERENCES VENDEDOR (login)
	);
    
	CREATE TABLE CONTEM(

    	IDvenda integer,
    	IDpagamento integer,

    	PRIMARY KEY (IDpagamento, IDvenda),
    	FOREIGN KEY (IDpagamento) REFERENCES PAGAMENTO (IDpagamento),
    	FOREIGN KEY (IDvenda) REFERENCES VENDA (IDvenda)
	);
    
	CREATE TABLE REALIZA(

    	login varchar(20),
    	IDentrega integer,
   	 
    	PRIMARY KEY (login, IDentrega),
    	FOREIGN KEY (login) REFERENCES TRANSPORTADORA (login),
    	FOREIGN KEY (IDentrega) REFERENCES ENTREGA (IDentrega)

	);


    
CREATE TABLE VENDADOPRODUTO(
     	login varchar(20),
     	IDvenda integer,
     	IDproduto integer,
     	PRIMARY KEY (login, IDvenda, IDproduto),
     	FOREIGN KEY (login) REFERENCES VENDEDOR (login),        	 
     	FOREIGN KEY (IDvenda) REFERENCES VENDA (IDvenda),   	 
     	FOREIGN KEY (IDproduto) REFERENCES PRODUTO (IDproduto)     	 
);



INSERT INTO ACESSO	 
VALUES
 	('MARIA_0', 333, 'Maria 0', '997635241', 'rua 500', 0),
 	('MARIA_1', 334, 'Maria 1', '997635242', 'rua 501', 1),
 	('MARIA_2', 335, 'Maria 2', '997635243', 'rua 502', 2),
 	('MARIA_3', 336, 'Maria 3', '997635244', 'rua 503', 3),
 	('MARIA_4', 337, 'Maria 4', '997635245', 'rua 504', 0),
 	('MARIA_5', 338, 'Maria 5', '997635246', 'rua 505', 1),
 	('MARIA_6', 339, 'Maria 6', '997635247', 'rua 506', 2),
 	('MARIA_7', 340, 'Maria 7', '997635248', 'rua 507', 3),
 	('MARIA_8', 341, 'Maria 8', '997635249', 'rua 508', 0),
 	('MARIA_9', 342, 'Maria 9', '997635250', 'rua 509', 1),
 	('MARIA_10', 343, 'Maria 10', '997635251', 'rua 510', 2),
 	('MARIA_11', 344, 'Maria 11', '997635252', 'rua 511', 3),
 	('MARIA_12', 345, 'Maria 12', '997635253', 'rua 512', 0),
 	('MARIA_13', 346, 'Maria 13', '997635254', 'rua 513', 1),
 	('MARIA_14', 347, 'Maria 14', '997635255', 'rua 514', 2);

INSERT INTO ADMINISTRADOR    
VALUES
    	('MARIA_0', 333, 00000, '997635241'),
    	('MARIA_4', 337, 11111, '997635245'),
    	('MARIA_8', 341, 22222, '997635249'),
    	('MARIA_12', 345, 33333, '997635253');

INSERT INTO CLIENTE    
VALUES
 	('MARIA_1', 334, 5, '997635242'),
 	('MARIA_5', 338, 8, '997635246'),
 	('MARIA_9', 342, 4, '997635250'),
 	('MARIA_13', 346, 3, '997635254');



INSERT INTO VENDEDOR    
VALUES
 	('MARIA_2', 335, 0, '997635243'),
 	('MARIA_6', 339, 1, '997635247'),
 	('MARIA_10', 343, 2, '997635251'),
 	('MARIA_14', 347, 3, '997635255');

INSERT INTO TRANSPORTADORA	 
VALUES
 	('MARIA_3', 336, 'SEDEX', '997635244'),
 	('MARIA_7', 340, 'PAC', '997635248'),
 	('MARIA_11', 344, 'FEDEX', '997635252');



INSERT INTO VENDA	 
VALUES
(1, 30, 'V1' ,'MARIA_1', 334),
 	(2, 24, 'V2' ,'MARIA_1', 334),
 	(3, 36, 'V3' ,'MARIA_1', 334),
 	(4, 30, 'V4' ,'MARIA_1', 334),
 	(5, 30, 'V5' ,'MARIA_1', 334),
 	(6, 24, 'V6', 'MARIA_5', 338),
 	(7, 25, 'V7', 'MARIA_5', 338),
 	(8, 100,'V8','MARIA_5', 338),
 	(9, 112,'V9', 'MARIA_5', 338),
 	(10, 132,'V10', 'MARIA_5', 338),
 	(11, 122,'V11', 'MARIA_5', 338),
 	(12, 154,'V12', 'MARIA_5', 338),
 	(13, 133,'V13', 'MARIA_5', 338),
 	(14, 112,'V14','MARIA_9', 342),
 	(15, 111,'V15','MARIA_9', 342),
 	(16, 222,'V16','MARIA_9', 342),
 	(17, 333,'V17','MARIA_9', 342),
 	(18, 2332,'V18','MARIA_13', 346),
 	(19, 1112,'V19', 'MARIA_13', 346),
 	(20, 1234,'V20', 'MARIA_13', 346)
;


INSERT INTO PAGAMENTO	 
VALUES
(1, 'CARTAO' ,'MARIA_1', 334),
 	(2, 'DINHEIRO' ,'MARIA_1', 334),
 	(3, 'CHEQUE' ,'MARIA_1', 334),
 	(4,  'CARTAO' ,'MARIA_1', 334),
 	(5,  'CARTAO' ,'MARIA_1', 334),
 	(6, 'CHEQUE', 'MARIA_5', 338),
 	(7, 'CARTAO', 'MARIA_5', 338),
 	(8, 'CARTAO','MARIA_5', 338),
 	(9,  'CARTAO' , 'MARIA_5', 338),
 	(10, 'DINHEIRO', 'MARIA_5', 338),
 	(11, 'DINHEIRO', 'MARIA_5', 338),
 	(12, 'CHEQUE', 'MARIA_5', 338),
 	(13,  'CARTAO' , 'MARIA_5', 338),
 	(14, 'CHEQUE','MARIA_9', 342),
 	(15,  'CARTAO' ,'MARIA_9', 342),
 	(16, 'CHEQUE','MARIA_9', 342),
 	(17, 'DINHEIRO','MARIA_9', 342),
 	(18,  'CARTAO' ,'MARIA_13', 346),
 	(19, 'DINHEIRO', 'MARIA_13', 346),
 	(20,  'CARTAO' , 'MARIA_13', 346);

INSERT INTO PRODUTO    
VALUES
 	(1, 'A1', 'B1', 'C1',30),
 	(2, 'A2', 'B2', 'C2',24),
 	(3, 'A3', 'B3', 'C3',36),
 	(4, 'A4', 'B4', 'C4',30),
 	(5, 'A5', 'B5', 'C5',30),
 	(6, 'A6', 'B6', 'C6',24),
 	(7, 'A7', 'B7', 'C7',25),
 	(8, 'A8', 'B8', 'C8',100),
 	(9, 'A9', 'B9', 'C9',112),
 	(10, 'A10', 'B10', 'C10',132),
 	(11, 'A11', 'B11', 'C11',122),
 	(12, 'A12', 'B12', 'C12',154),
 	(13, 'A13', 'B13', 'C13',133),
	(14, 'A14', 'B14', 'C14',112),
 	(15, 'A15', 'B15', 'C15',111),
 	(16, 'A16', 'B16', 'C16',222),
 	(17, 'A17', 'B17', 'C17',333),
 	(18, 'A18', 'B18', 'C18',2332),
 	(19, 'A19', 'B19', 'C19',1112),
 	(20, 'A20', 'B20', 'C20',1234)
;




INSERT INTO FISCALIZA
VALUES
	('MARIA_0',1),   
	('MARIA_0',2),
	('MARIA_0',3),
	('MARIA_0',4),
	('MARIA_0',5),
	('MARIA_4',6),
	('MARIA_4',7),
	('MARIA_4',8),
	('MARIA_4',9),
	('MARIA_4',10),
	('MARIA_8',11),
	('MARIA_8',12),
	('MARIA_8',13),
	('MARIA_8',14),
	('MARIA_8',15),
	('MARIA_12',16),
	('MARIA_12',17),
	('MARIA_12',18),
	('MARIA_12',19),
	('MARIA_12',20)
;

INSERT INTO ENTREGA
VALUES

	(0, 'rua 600', 'rua 500', 5, 'MARIA_0', 333),
	(1, 'rua 600', 'rua 501', 15, 'MARIA_1', 334),
	(2, 'rua 600', 'rua 502', 25, 'MARIA_2', 335),
	(3, 'rua 700', 'rua 503', 3, 'MARIA_3', 336),
	(4, 'rua 700', 'rua 504', 13, 'MARIA_4', 337),
	(5, 'rua 700', 'rua 505', 23, 'MARIA_5', 338),
	(6, 'rua 800', 'rua 506', 27, 'MARIA_6', 339),
	(7, 'rua 800', 'rua 507', 43, 'MARIA_7', 340),
	(8, 'rua 800', 'rua 508', 6, 'MARIA_8', 341),
	(9, 'rua 800', 'rua 509', 33, 'MARIA_9', 342)
;



INSERT INTO SMARTPHONE
VALUES
    
	(1, 32),
      	(2, 64)

;

INSERT INTO NOTEBOOK
VALUES
	(3, 8, 'I7'),
      	(4, 16, 'I5')
;

INSERT INTO DESKTOP
VALUES

	(5, 14, 500),
      	(6, 16, 1000)
;

INSERT INTO TABLET
VALUES

	(7, 64, 6),
      	(8, 128, 5)
;

INSERT INTO IMPRESSORA
VALUES

	(9, 'impressao'),
      	(10, 'impressao, xerox')
;

INSERT INTO VIDEOGAME
VALUES

	(11, 32, 'Playstation'),
      	(12, 32, 'Xbox')
;

INSERT INTO ACESSORIO
VALUES

	(13, 'Mousepad', 'Playstation'),
      	(14, 'fone de ouvido', 'Xbox')
;

INSERT INTO TECLADO
VALUES

	(15, 20),
      	(16, 22)
;

INSERT INTO MOUSE
VALUES

	(17, 'DELL'),
      	(18, 'Multilaser')
;

INSERT INTO MONITOR
VALUES

	(19, 16),
      	(20, 15)
;

INSERT INTO AVALIAÇÃO
VALUES

	('MARIA_1', 'MARIA_0', 'muito bom', 5),
	('MARIA_5', 'MARIA_0', 'bom', 4),
	('MARIA_9', 'MARIA_4', 'ruim', 2),
	('MARIA_13', 'MARIA_4', 'pessimo', 1),
	('MARIA_1', 'MARIA_8', 'muito bom', 5),
	('MARIA_5', 'MARIA_8', 'bom', 4),
	('MARIA_9', 'MARIA_8', 'ruim', 2),
	('MARIA_13', 'MARIA_12', 'pessimo', 1),
	('MARIA_1', 'MARIA_12', 'muito bom', 5),
	('MARIA_5', 'MARIA_12', 'bom', 4)

;



INSERT INTO EDITAR
VALUES

	('MARIA_2', 1, 2018-01-06, 2018-02-06, 2018-03-06),
	('MARIA_2', 2, 2017-03-09, 2017-04-09, 2017-05-09),
	('MARIA_6', 3, 2019-05-04, 2019-05-05, 2019-05-07),
	('MARIA_6', 4, 2017-09-09, 2017-09-10, 2017-09-11),
	('MARIA_10', 5, 2018-01-06, 2018-02-06, 2018-03-06),
	('MARIA_10', 6, 2017-03-09, 2017-04-09, 2017-05-09),
	('MARIA_10', 7, 2019-05-04, 2019-05-05, 2019-05-07),
	('MARIA_14', 8, 2017-09-09, 2017-09-10, 2017-09-11),
	('MARIA_14', 9, 2018-01-06, 2018-02-06, 2018-03-06),
	('MARIA_14', 10, 2017-03-09, 2017-04-09, 2017-05-09)

;


INSERT INTO RECEBE
VALUES

	('MARIA_2', 1),
	('MARIA_2', 2),
	('MARIA_2', 3),
	('MARIA_2', 4),
	('MARIA_2', 5),
	('MARIA_6', 6),
	('MARIA_6', 7),
	('MARIA_6', 8),
	('MARIA_6', 9),
	('MARIA_6', 10),
	('MARIA_10', 11),
	('MARIA_10', 12),
	('MARIA_10', 13),
	('MARIA_10', 14),
	('MARIA_10', 15),
	('MARIA_14', 16),
	('MARIA_14', 17),
	('MARIA_14', 18),
	('MARIA_14', 19),
	('MARIA_14', 20)
;

INSERT INTO CONTEM
VALUES

	(1,1),
	(2,2),
	(3,3),
	(4,4),
	(5,5),
	(6,6),
	(7,7),
	(8,8),
	(9,9),
	(10,10),
	(11,11),
	(12,12),
	(13,13),
	(14,14),
	(15,15),
	(16,16),
	(17,17),
	(18,18),
	(19,19),
	(20,20)

;

INSERT INTO REALIZA
VALUES

	('MARIA_3', 0),
	('MARIA_3', 1),
	('MARIA_3', 2),
	('MARIA_7', 3),
	('MARIA_7', 4),
	('MARIA_7', 5),
	('MARIA_11', 6),
	('MARIA_11', 7),
	('MARIA_11', 8),
	('MARIA_11', 9)
;

INSERT INTO VENDADOPRODUTO
VALUES

	('MARIA_2', 1, 1),
	('MARIA_2', 2, 2),
	('MARIA_2', 3, 3),
	('MARIA_2', 4, 4),
	('MARIA_2', 5, 5),
	('MARIA_6', 6, 6),
	('MARIA_6', 7, 7),
	('MARIA_6', 8, 8),
	('MARIA_6', 9, 9),
	('MARIA_6', 10, 10),
	('MARIA_10', 11, 11),
	('MARIA_10', 12, 12),
	('MARIA_10', 13, 13),
	('MARIA_10', 14, 14),
	('MARIA_10', 15, 15),
	('MARIA_14', 16, 16),
	('MARIA_14', 17, 17),
	('MARIA_14', 18, 18),
	('MARIA_14', 19, 19),
	('MARIA_14', 20, 20)
;




