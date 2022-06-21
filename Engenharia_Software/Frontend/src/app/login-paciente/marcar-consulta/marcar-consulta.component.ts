import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { IConsultaAgendar } from 'src/app/interfaces/IConsultaAgendar';
import { IEspecialidade } from 'src/app/interfaces/IEspecialidade';
import { IHorario } from 'src/app/interfaces/IHorario';
import { IMedico } from 'src/app/interfaces/IMedico';
import { ApiService } from 'src/app/services/api.service';
import { IPaciente } from '../../interfaces/IPaciente';

@Component({
  selector: 'app-marcar-consulta',
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.scss']
})
export class MarcarConsultaComponent implements OnInit {

  Horario_ID : string | null;
  Medico_ID: string | null;
  Especialidade_Id: string | null;
  public horario: IHorario | null;
  public medico: IMedico | null;
  public especialidade: IEspecialidade | null;

  paciente: IPaciente | undefined;
  paciente_ID: string | null =  localStorage.getItem('hawk_medical');
  
  constructor(private _Activatedroute: ActivatedRoute,private apiService: ApiService,private router: Router,public auth: AutenticacaoService,) { 
    this.Horario_ID = this._Activatedroute.snapshot.paramMap.get("Horario_ID");
    this.Especialidade_Id = this._Activatedroute.snapshot.paramMap.get("Especialidade_ID");
    apiService.getHorarioById(this.Horario_ID??"").subscribe(data => 
      {
        this.horario = data;
        apiService.getMedicoById(this.horario?.Medico_ID??"").subscribe(m => this.medico = m);
      });
    apiService.getEspecialidadeById(this.Especialidade_Id??"").subscribe(data => this.especialidade = data);
    
  }

  ngOnInit(): void {

    this.apiService.getPacienteById(this.paciente_ID ?? "").subscribe(paciente => {
      this.paciente = <IPaciente>paciente;
    });
  }

  EfetivarAgendamento():void{
    let consulta = <IConsultaAgendar>{}
    consulta.Especialidade_ID = this.especialidade?.Especialidade_ID??"";
    consulta.Medico_ID = this.medico?.Medico_ID??"";
    consulta.Horario_ID =this.horario?.Horario_ID??"";
    consulta.Paciente_ID = localStorage.getItem('hawk_medical')??"";
    consulta.Status = 0;
    this.apiService.addConsulta(consulta).subscribe(data=>{
      this.router.navigate(['paciente/agendamento-efetivado/',data.Consulta_ID])}, (error) => console.log(error));
  }

}

