import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { IEspecialidade } from 'src/app/interfaces/IEspecialidade';
import { ApiService } from 'src/app/services/api.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IHorario } from 'src/app/interfaces/IHorario';
import { IPaciente } from 'src/app/interfaces/IPaciente';
import { IHorarioDisponivel } from 'src/app/interfaces/IHorarioDisponivel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './busca-horario.component.html',
  styleUrls: ['./busca-horario.component.scss']
})
export class BuscaHorarioComponent implements OnInit {

  form!: FormGroup;
  especialidades: IEspecialidade[] = []
  public horariosDisponiveis: IHorarioDisponivel[] = []
  displayedColumns: string[] = ['Nome_Medico', 'Horario_Inicio', 'Data', 'MarcarConsulta'];
  submmited: boolean;
  public buscaRealizada:boolean = false;

  paciente: IPaciente | undefined;
  paciente_ID: string | null =  localStorage.getItem('hawk_medical');

  constructor(private router: Router,private apiService: ApiService, public auth: AutenticacaoService, private fb: FormBuilder) {
    this.apiService.getPacienteById(this.paciente_ID ?? "").subscribe(paciente => {
      this.paciente = <IPaciente>paciente;
    });
  }

  ngOnInit(): void {
    this.apiService.getEspecialidades().subscribe(data => this.especialidades = data);
    this.form = this.fb.group({
      Especialidade: [null, [Validators.required]],
      Data: [null, [Validators.required]]
    });
    
  }

  selecionaEspecialidade(value: string) {
    console.log(value);
  }

  buscaHorarios() {
    this.submmited = true;
    if (this.form.valid) {
      this.apiService.getHorariosMedico(this.form.value['Especialidade'], this.form.value['Data']).subscribe(data => {
        this.horariosDisponiveis = [];

        
        
        data.forEach(element => {
          element.Horarios.forEach(h => {
            let medicoHorario = <IHorarioDisponivel>{};
            medicoHorario.Medico_ID = element.Medico_ID;
            medicoHorario.Data = h.Data;
            medicoHorario.Horario_ID = h.Horario_ID;
            medicoHorario.Nome_Medico = element.Nome;
            medicoHorario.Horario_Inicio = h.Horario_Inicio
            this.horariosDisponiveis.push(medicoHorario)
          })
        })

        // Ordenando
        this.horariosDisponiveis = this.horariosDisponiveis.sort(
          (a, b) => (a.Horario_Inicio > b.Horario_Inicio) ? 1 : -1
        );

      });
      this.buscaRealizada = true;
    }
  }

  marcarConsulta(Horario_ID: string) {
    console.log(Horario_ID);
    this.router.navigate(['paciente/efetivar-consulta',Horario_ID,this.form.value['Especialidade']])
  }

}
