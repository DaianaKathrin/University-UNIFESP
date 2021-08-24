//Daiana Kathrin Santana Santos 120.357
//Isadora Rosa de Freitas Muniz 120.431

import java.util.Random;

public class JogoDaVida extends Thread { 
    
    public int inicio; 
    public int fim;
    public int matriz1[][];
    public int matriz2[][];
    public int geracao;
    public int N;

    public JogoDaVida(int inicio, int fim, int matriz1[][], int matriz2[][], int geracao, int N){
        this.inicio = inicio;
        this.fim = fim;
        this.matriz1 = matriz1;
        this.matriz2 = matriz2;
        this.geracao = geracao;
        this.N = N;
    }

    public static void inicializa(int matriz1[][], int matriz2[][], int N){
        
        int i, j;
        Random gerador = new Random(1985);

        for(i=0 ; i<N; i++){ 
            for(j=0; j<N; j++){
                matriz1[i][j] = gerador.nextInt(2147483647) % 2;
                matriz2[i][j] = 0;
            }
        }
        System.out.println(getVivos(matriz1, N));
    }

    private static int getNeighbors(int i, int j, int matriz[][], int N){
        int l1, l2, l3;
        int c1, c2, c3;
        int vivos = 0;

        if(i == 0) l1 = N-1;
        else l1 = i-1;
        l2 = i;
        l3 = (i+1) % N;
        
        if(j == 0) c1 = N-1;
        else c1 = j-1;
        c2 = j;
        c3 = (j+1) % N;

        vivos += matriz[l1][c1];
        vivos += matriz[l2][c1];
        vivos += matriz[l3][c1];
        vivos += matriz[l3][c2];
        vivos += matriz[l3][c3];
        vivos += matriz[l2][c3];
        vivos += matriz[l1][c3];
        vivos += matriz[l1][c2];

        return vivos;
    }

    private void setNewGeneration(int velha[][], int nova[][]){
        int i, j, vivos;

        for(i=this.inicio; i<this.fim; i++){
            for(j=0; j<this.N; j++){
                vivos = getNeighbors(i, j, velha, this.N);

                if(velha[i][j] == 1 && (vivos < 2)) nova[i][j] = 0;
                else if(velha[i][j] == 1 && (vivos == 3 || vivos == 2)) nova[i][j] = 1;
                else if(velha[i][j] == 1 && vivos >= 4) nova[i][j] = 0;
                else if(velha[i][j] == 0 && vivos == 3) nova[i][j] = 1;
                else nova[i][j] = 0;
            }
        }
    }

    public static int getVivos(int matriz[][], int N){
        int i, j, vivos = 0;

        for(i=0; i<N; i++)
            for(j=0; j<N; j++)
                vivos += matriz[i][j];

        return vivos;
    }

    public void run(){


        if(this.geracao%2 == 1) //se i é impar
            this.setNewGeneration(this.matriz1, this.matriz2);
        else //se i é par
            this.setNewGeneration(this.matriz2, this.matriz1);
        
    }


    // Função auxiliar
    private static void imprime(int matriz[][], int N){
        int i, j;

        for(i=0; i<N; i++){
            for(j=0; j<N; j++){
                System.out.print(matriz[i][j] + " ");
            }
            System.out.println();
        }
    }

	public static void main(String args[]) throws InterruptedException{
		
		if(args.length != 1 || !args[0].matches("\\d*[^0]\\d*")) {
			System.err.println("digitar: java jogoDaVida <MaxThreads>");
			System.exit(1);
		}
		
        int MaxThreads = Integer.parseInt(args[0]);

        int N = 2048;
        int G = 2000;
        int i, j;

        int matriz1[][] = new int[N][N];
        int matriz2[][] = new int[N][N];
        inicializa(matriz1, matriz2, N);

        int vivos;

        long startTime = System.currentTimeMillis();

        for(i=1; i<=G; i++){
            JogoDaVida[] th = new JogoDaVida[MaxThreads];

            for(j=0; j<MaxThreads; j++) {
                th[j] = new JogoDaVida((N/MaxThreads)*j, (N/MaxThreads) * (j+1), matriz1, matriz2, i, N);
                th[j].start();
            }
            for(j=0; j<MaxThreads; j++) {
                th[j].join();
            }

        }    

        
        if(G%2 == 0) vivos = getVivos(matriz1, N);
	    else vivos = getVivos(matriz2, N);
        System.out.println(vivos);

        long calcTime = (System.currentTimeMillis() - startTime)/1000;
        System.out.println("Tempo decorrido: " + calcTime + " s\n");
		
	}
}
