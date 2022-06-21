import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { IExame } from 'src/app/interfaces/IExame';
import { IConsultaExame } from 'src/app/interfaces/IConsultaExame';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './add-exame.component.html',
  styleUrls: ['./add-exame.component.scss']
})
export class AddExameComponent implements OnInit {

  exames: IExame[] = [];
  exameSelecionado: IExame[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data_in: any, private apiService: ApiService, private dialogRef: MatDialogRef<AddExameComponent>) { }

  ngOnInit(): void {
    this.apiService.getExamesByPaciente(this.data_in.paciente_id).subscribe(
      (data) => {
        // Pegando a resposta HTTP
        this.exames = data;
        console.log(this.exames);
      }
    )
    
    console.log(this.data_in.consulta_id)
  }

  associateExam(): void {
    if (this.exameSelecionado.length == 0) {
      window.alert("Nenhum exame adicionado.");
      this.dialogRef.close();
      return;
    }
    
    this.exameSelecionado.forEach(element => {
      let ConsultaExame = <IConsultaExame>{};
      ConsultaExame.Consulta_ID = this.data_in.consulta_id;
      ConsultaExame.Exame_ID = element.Exame_ID;
      console.log(ConsultaExame);
      this.apiService.addConsultaExame(ConsultaExame).subscribe();
    });

    window.alert("Exames adicionados com sucesso!");
    this.dialogRef.close();
  }

  cancel(): void {

    this.dialogRef.close();
  }

}
