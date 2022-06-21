import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { IMedicoEspecialidade } from 'src/app/interfaces/IMedicoEspecialidade';
import { ApiService } from 'src/app/services/api.service';
import { IPaciente } from '../../interfaces/IPaciente';

@Component({
  selector: 'app-agendamento-efetivado',
  templateUrl: './agendamento-efetivado.component.html',
  styleUrls: ['./agendamento-efetivado.component.scss']
})
export class AgendamentoEfetivadoComponent implements OnInit {

  consulta: IConsulta|null;
  Consulta_ID: string |null;
  medicoEspecialidade: IMedicoEspecialidade|null;
  paciente: IPaciente | undefined;
  paciente_ID: string | null =  localStorage.getItem('hawk_medical');
  
  constructor(private _Activatedroute: ActivatedRoute, private apiService: ApiService, private router: Router) { 
    this.Consulta_ID = this._Activatedroute.snapshot.paramMap.get("Consulta_ID");
    apiService.getConsultaById(this.Consulta_ID??"").subscribe(data => 
      {
        this.consulta = data;
        apiService.getMedicoEspecialidade(this.consulta.Medico_ID,this.consulta.Especialidade_ID).subscribe(m => this.medicoEspecialidade = m);
      });

  }

  voltar():void{
    this.router.navigate(['paciente'])
  }

  ngOnInit(): void {
    this.apiService.getPacienteById(this.paciente_ID ?? "").subscribe(paciente => {
      this.paciente = <IPaciente>paciente;
    });
  }
}


