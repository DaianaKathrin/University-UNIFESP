import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { DialogData } from 'src/app/login-paciente/historico/historico.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-iniciar-sessao',
  templateUrl: './iniciar-sessao.component.html',
  styleUrls: ['./iniciar-sessao.component.scss']
})
export class IniciarSessaoComponent implements OnInit {

  inputLink: string;
  consultas: IConsulta[] = []
  prox_consulta: IConsulta;
  Medico_ID: string | null =  localStorage.getItem('hawk_medical');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiService: ApiService, private router: Router) {
    let today = new Date();
    this.apiService.getConsultas().subscribe(

      (response) => {
        // Pegando a resposta HTTP
        this.consultas = <IConsulta[]>response;

        //console.log(this.consultas);

        // Filtrando as consultas do medico
        this.consultas = this.consultas.filter(
          a => (a.Medico_ID === this.Medico_ID && a.Status < 2)
        );

        // Ordernando consultas
        this.consultas = this.consultas.sort(
          (a, b) => (new Date(a.horarios.Data + ' ' + a.horarios.Horario_Fim) > new Date(b.horarios.Data + ' ' + b.horarios.Horario_Fim)) ? 1 : -1
        );

        this.prox_consulta = this.consultas[0];
        this.consultas.shift();

      },
      error => {
        console.log("Erro:" + error)
      }
    );
   }

  ngOnInit(): void {
    
  }

  onSubmit(Consulta_ID: string) {
   
    this.apiService.addLinkMeet(Consulta_ID, this.inputLink).subscribe( 
      error => console.log(error)
    );

    this.apiService.updateStatusConsulta(Consulta_ID, this.prox_consulta.Status+1).subscribe(
      (response) => {
        location.reload();
      }
    );
  }


}
