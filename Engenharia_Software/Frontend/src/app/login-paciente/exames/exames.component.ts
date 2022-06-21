import { IPaciente } from './../../interfaces/IPaciente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NovoExameComponent } from './novo-exame/novo-exame.component';
import { ApiService } from '../../services/api.service';
import { IExame } from 'src/app/interfaces/IExame';
import { IReceita } from 'src/app/interfaces/IReceita';
@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.scss']
})


export class ExamesComponent implements OnInit {

  displayedColumns: string[] = ['download', 'filename', 'type', 'created_at', 'actions'];
  displayedColumns1: string[] = ['download', 'filename', 'created_at'];

  // Paciente_ID: string = '4bcff5f6-83ae-11ec-8ef3-06340e997e5e';
  paciente_ID: string | null = localStorage.getItem('hawk_medical');
  ac_paciente: IPaciente;
  paciente_name: string;
  exames: IExame[] = [];
  receitas: IReceita[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    let today = new Date();

    this.apiService.getPacienteById(this.paciente_ID ?? "").subscribe(
      (response) => {
        // Pegando a resposta HTTP
        this.ac_paciente = <IPaciente>response;
        this.paciente_name = this.ac_paciente.Nome.split(" ")[0];
      },
      error => {
        console.log("Erro:" + error)
      }
    );

    apiService.getExamesByPaciente(this.paciente_ID ?? "").subscribe(data => this.exames = data)
    apiService.getReceitasByPaciente(this.paciente_ID ?? "").subscribe(data => this.receitas = data)

  }

  deleteMethod(Exame_ID:string) {
    if (confirm("Deseja mesmo excluir esse exame?")) {
      console.log(Exame_ID);
      this.apiService.removeExame(Exame_ID).subscribe(() => alert("Exame removido com sucesso."))
      this.apiService.getExamesByPaciente(this.paciente_ID ?? "").subscribe(data => this.exames = data)
      window.location.reload();
    }
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    this.dialog.open(NovoExameComponent, dialogConfig);
  }

  ExameDowload(Exame_ID: string): void {
    console.log(Exame_ID);
    this.apiService.getExame(Exame_ID).subscribe((response: any) => {
      const url = window.URL.createObjectURL(response);
      window.open(url);
    });

  }

  ReceitaDowload(Receita_ID: string): void {
    console.log(Receita_ID);
    this.apiService.getReceita(Receita_ID).subscribe((response: any) => {
      const url = window.URL.createObjectURL(response);
      window.open(url);
    });

  }

  ngOnInit(): void {

  }

}

