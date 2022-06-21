import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaciente } from 'src/app/interfaces/IPaciente';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { AddExameComponent } from './add-exame/add-exame.component';


@Component({
  selector: 'app-suas-consultas',
  templateUrl: './suas-consultas.component.html',
  styleUrls: ['./suas-consultas.component.scss']
})


export class SuasConsultasComponent implements OnInit {
  

  displayedColumns: string[] = ['data', 'horario', 'especialidade', 'medico', 'acoes'];

  /* Paciente_ID: string = '4bcff5f6-83ae-11ec-8ef3-06340e997e5e';
  paciente_name: string;
  ac_paciente: IPaciente; */
  paciente: IPaciente | undefined;
  //paciente_ID: string = '4bcff5f6-83ae-11ec-8ef3-06340e997e5e';
  paciente_ID: string | null =  localStorage.getItem('hawk_medical');

  consultas: IConsulta[] = [];
  prox_consulta: IConsulta;

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
          a => new Date(a.horarios.Data + ' ' + a.horarios.Horario_Fim) >= today && a.Status >= 0
        );
        
        // Ordernando consultas 
        this.consultas = this.consultas.sort(
          (a, b) => (new Date(a.horarios.Data + ' ' + a.horarios.Horario_Fim) > new Date(b.horarios.Data + ' ' + b.horarios.Horario_Fim)) ? 1 : -1
        );
        
        // Removendo primeiro elemento
        this.prox_consulta = this.consultas[0];
        this.consultas.shift(); 
      
      },
      error => {
        console.log("Erro:" + error)
      }
    );
  }
  

  cancelarConsulta(Consulta_ID: string) { 
    if(confirm("Deseja mesmo cancelar essa consulta?")) {
      this.apiService.updateStatusConsulta(Consulta_ID, -1).subscribe(
        (response) => {
          location.reload();
        }
      );
    }
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
      case 1:   return "#007A33"
      default:  return "gray"
    }  
  }
  

  entrarSessao(consulta_id:string, status: number){
    
    if(status != 1) {
      window.alert("Sua consulta ainda não foi iniciada!\nAguarde o médico iniciar a sessão.");
    } else{
      this.apiService.getConsultaById(consulta_id).subscribe(
        (response) => {
          window.open(response.LinkMeet);
        }
      );
    }
  };

  newExam(consulta_id:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.height = "180px";
    dialogConfig.data = { 
      consulta_id: consulta_id,
      paciente_id: this.paciente_ID
    };
    this.dialog.open(AddExameComponent, dialogConfig);
  }

  ngOnInit(): void {
 
  }


}
