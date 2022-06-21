import { IMedico } from 'src/app/interfaces/IMedico';
import { Component, OnInit } from '@angular/core';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IniciarSessaoComponent } from './iniciar-sessao/iniciar-sessao.component';
import { ExamesPacienteComponent } from './exames-paciente/exames-paciente.component';
import { ReceitaComponent } from './receita/receita.component';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {

  medico: IMedico | undefined;
  Medico_ID: string | null =  localStorage.getItem('hawk_medical');

  displayedColumns: string[] = ['Paciente', 'data', 'horario', 'Especialidade'];

  consultas: IConsulta[] = [];
  consultasFiltradas: IConsulta[] = [];
  prox_consulta: IConsulta | undefined;


  constructor(private apiService: ApiService, private dialog: MatDialog) {
  
    this.apiService.getMedicoById(this.Medico_ID ?? "").subscribe(medico => {
      this.medico = <IMedico>medico;
    },
      error => {
        console.log("Erro:" + error)
      }
    );

    this.apiService.getConsultasMedico(this.Medico_ID ?? "").subscribe(

      (response) => {
        // Pegando a resposta HTTP
        this.consultas = <IConsulta[]>response;
        
        this.consultas.forEach( consulta => {
          if(consulta.Status == 0 || consulta.Status == 1)
            this.consultasFiltradas.push(consulta);
        })
      
        // Ordernando consultas
        this.consultasFiltradas = this.consultasFiltradas.sort(
          (a, b) => (new Date(a.horarios.Data + ' ' + a.horarios.Horario_Fim) > new Date(b.horarios.Data + ' ' + b.horarios.Horario_Fim)) ? 1 : -1
        );
        
        // Pega próxima consulta
        this.prox_consulta = this.consultasFiltradas.shift();
        console.log(this.prox_consulta?.Consulta_ID);

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
        },
        error => {
          console.log("Erro:" + error)
        }
      );
    }
  }

  iniciaSessao(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.height = "200px";
    this.dialog.open(IniciarSessaoComponent, dialogConfig);
  }

  enviaReceita(Consulta_Id:string){
    localStorage.setItem('Consulta_ID',Consulta_Id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "200px";
    this.dialog.open(ReceitaComponent, dialogConfig);
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
      case 1:   return "#F58426"
      default:  return "#007A33"
    }  
  }
  
  terminarSessao(Consulta_ID: string, consulta: IConsulta){
    this.apiService.updateStatusConsulta(Consulta_ID, consulta.Status+1).subscribe(
      (response) => {
        location.reload();
      },
      error => {
        console.log("Erro:" + error)
      }
    );
  }

  mostraExames(Consulta_Id: string) {
    localStorage.setItem('Consulta_ID',Consulta_Id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "500px";
    this.dialog.open(ExamesPacienteComponent, dialogConfig);
  }

  ngOnInit(): void {

    console.log(this.Medico_ID);
    
  }
}

