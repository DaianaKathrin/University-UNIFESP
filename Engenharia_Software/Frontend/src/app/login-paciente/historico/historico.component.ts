import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { IPaciente } from 'src/app/interfaces/IPaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DetalhesConsultaComponent } from './detalhes-consulta/detalhes-consulta.component';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})

export class HistoricoComponent implements OnInit {

  displayedColumns: string[] = ['status', 'especialidade', 'medico', 'data', 'horario', 'acoes'];


  /* Paciente_ID: string = '4bcff5f6-83ae-11ec-8ef3-06340e997e5e';
  paciente_name: string; */
  paciente: IPaciente | undefined;
  paciente_ID: string | null =  localStorage.getItem('hawk_medical');
  ac_paciente: IPaciente;

  consultas: IConsulta[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) { 
    let today = new Date();

    this.apiService.getPacienteById(this.paciente_ID ?? "").subscribe(

      (paciente) => {
        // Pegando a resposta HTTP

        this.paciente = <IPaciente>paciente;
      },
      error => {
        console.log("Erro:" + error)
      }
    );

    this.apiService.getConsultasPaciente(this.paciente_ID ?? "").subscribe(

      (response) => {
        // Pegando a resposta HTTP
        this.consultas = <IConsulta[]>response;

        // Filtrando dados posteriores
        this.consultas = this.consultas.filter(
          a => new Date(a.horarios.Data + ' ' + a.horarios.Horario_Fim) < today && (a.Status == -1 || a.Status == 2)
        );

        // Ordernando consultas
        this.consultas = this.consultas.sort(
          (a, b) => (new Date(a.horarios.Data + ' ' + a.horarios.Horario_Fim) > new Date(b.horarios.Data + ' ' + b.horarios.Horario_Fim)) ? 1 : -1
        );
      },
      error => {
        console.log("Erro:" + error);
      }
    );
  }

  checkStatus(status: number) { 
    switch(status) { 
      case -1:  return "Cancelado"
      case 0:   return "Não Iniciado"
      case 1:   return "Em Andamento"
      case 2:   return "Realizado"   
      default:  return "Indefinido"
    } 
  };

  getColorStatus(status: number){
    switch(status) { 
      case -1:  return "red"
      case 0:   return "black"
      case 1:   return "black"
      case 2:   return "green" 
      default:  return "black"
    } 
  };

  detalhes(consulta_id: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = { 
      consulta_id: consulta_id,
    };
    this.dialog.open(DetalhesConsultaComponent, dialogConfig);

  }
  

  ngOnInit(): void {
  }
  
}
