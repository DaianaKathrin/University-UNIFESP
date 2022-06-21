import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { IReceita } from 'src/app/interfaces/IReceita';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './detalhes-consulta.component.html',
  styleUrls: ['./detalhes-consulta.component.scss']
})
export class DetalhesConsultaComponent implements OnInit {

  receitas: IReceita[] = [];

  displayedColumns: string[] = ['nomeArquivo', 'arquivo'];

  constructor(@Inject(MAT_DIALOG_DATA) public data_in: any, private apiService: ApiService, private dialogRef: MatDialogRef<DetalhesConsultaComponent>) { }

  ngOnInit(): void {

    console.log(this.data_in.consulta_id);
    this.apiService.getReceitasByConsultaID(this.data_in.consulta_id).subscribe(
      (data) => {
        // Pegando a resposta HTTP
        this.receitas = data;
        console.log(this.receitas);
      },
      error => {
        console.log("Erro:" + error)
      }
    )
  
  
  }

  baixaArquivo(receita_id:string){
    this.apiService.getReceita(receita_id).subscribe((response: any) => {
      const url = window.URL.createObjectURL(response);
      window.open(url);
    });
  }


  cancel(): void {

    this.dialogRef.close();
  }

}
