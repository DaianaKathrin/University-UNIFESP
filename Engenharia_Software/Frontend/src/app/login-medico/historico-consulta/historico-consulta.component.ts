import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { IMedico } from 'src/app/interfaces/IMedico';
import { ApiService } from 'src/app/services/api.service';
import { VerReceitaComponent } from './ver-receita/ver-receita.component';

@Component({
  selector: 'app-historico-consulta',
  templateUrl: './historico-consulta.component.html',
  styleUrls: ['./historico-consulta.component.scss']
})
export class HistoricoConsultaComponent implements OnInit {

  displayedColumns: string[] = ['paciente','especialidade','data', 'horario', 'acoes']; 

  medico: IMedico | undefined;
  Medico_ID: string | null =  localStorage.getItem('hawk_medical');

  prox_consulta: IConsulta;
  consultas: IConsulta[] = [];
  consultasFiltradas: IConsulta[] = [];

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
                
        // Filtrando as consultas já concluídas
        this.consultas.forEach( consulta => {
          if(consulta.Status == 2)
            this.consultasFiltradas.push(consulta);
        });

        // Ordernando consultas
        this.consultasFiltradas = this.consultasFiltradas.sort(
          (a, b) => (new Date(a.horarios.Data + ' ' + a.horarios.Horario_Fim) > new Date(b.horarios.Data + ' ' + b.horarios.Horario_Fim)) ? 1 : -1
        );

      },
      error => {
        console.log("Erro:" + error)
      }
    );
  }

  verReceita(Paciente_ID: string){
    localStorage.setItem('Paciente_ID', Paciente_ID)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "500px";
    this.dialog.open(VerReceitaComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}