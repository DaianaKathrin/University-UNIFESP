import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IHorario } from 'src/app/interfaces/IHorario';
import { IMedico } from 'src/app/interfaces/IMedico';
import { IPaciente } from 'src/app/interfaces/IPaciente';
import { ApiService } from 'src/app/services/api.service';
import { window } from 'rxjs';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  displayedColumns: string[] = ['data','horarioInicio','horarioFim', 'delete'];
  horariosMedico: IHorario[] = [];
  form: FormGroup;
  submmited: boolean = false;
  Horario_Inicio: Date;
  Horario_Fim: Date;
  Data: Date;
  horarios: IHorario;
  medico: IMedico | undefined;
  Medico_ID: string | null =  localStorage.getItem('hawk_medical');

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    /* this.apiService.getAllHorariosMedicos().subscribe(

      (response) => {
        // Pegando a resposta HTTP
        this.horariosMedico = <IHorario[]>response;

        // Filtrando os horarios do medico
        this.horariosMedico = this.horariosMedico.filter(
          a => (a.Medico_ID === this.Medico_ID)
        );
          console.log(this.horariosMedico[0].Medico_ID)

        // Ordernando horarios
        this.horariosMedico = this.horariosMedico.sort(
          (a, b) => Date.parse(a.Data) > Date.parse(b.Data) ? 1 : -1
        
        );
      },
      error => {
        console.log("Erro:" + error)
      }); */

      this.apiService.getHorariosByMedicoId(this.Medico_ID ?? "").subscribe(horarios => {
        this.horariosMedico = <IHorario[]>horarios;

        console.log(this.horariosMedico); 

        this.horariosMedico = this.horariosMedico.sort(
          (a, b) => (new Date(a.Data).getTime() - new Date(b.Data).getTime())
        );

        this.horariosMedico = this.horariosMedico.sort(
          (a, b) => (new Date(a.Horario_Fim).getTime() - new Date(b.Horario_Fim).getTime())
        );
      });

        
 
   }

  ngOnInit(): void {
    this.apiService.getMedicoById(this.Medico_ID ?? "").subscribe(medico => {
      this.medico = <IMedico>medico;
    },
      error => {
        console.log("Erro:" + error)
      }
    );
    this.createForm(); 
    
  }

  createForm() {
    this.form = this.fb.group({
      Data: new FormControl(new Date().getDate()),
      Tempo_Consulta: [new FormControl(), Validators.required],
      Horario_Inicio: [new FormControl(), Validators.required],
      Horario_Fim: [new FormControl(), Validators.required]
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  convertMinString(minutos: number){
    let min;
    if(minutos%60 < 10) {
      min = '0'+ `${minutos%60}`
    }
    else{
      min = `${minutos%60}`
    }
    return `${(Math.floor(minutos/60))}:`+ min;
  }


  cadastraHorarios() {
      
      let Tempo_Consulta = this.form.value.Tempo_Consulta;
      let tipoDateInicio = new Date(this.form.value.Data + ' '+ this.form.value.Horario_Inicio);
      let tipoDateFim = new Date(this.form.value.Data + ' '+ this.form.value.Horario_Fim);

      let fimConsulta = new Date(tipoDateInicio);
      fimConsulta.setMinutes(fimConsulta.getMinutes()+Tempo_Consulta)
      let inicioConsulta = new Date(tipoDateInicio);


      while(fimConsulta<=tipoDateFim){
        let HorarioCadastra = <IHorario>{}
        HorarioCadastra.Data= this.form.value.Data;
        HorarioCadastra.Horario_Inicio= inicioConsulta.getHours()+':'+inicioConsulta.getMinutes()+':'+inicioConsulta.getSeconds();
        HorarioCadastra.Horario_Fim= fimConsulta.getHours()+':'+fimConsulta.getMinutes()+':'+fimConsulta.getSeconds();
        HorarioCadastra.Medico_ID= this.medico?.Medico_ID ?? "";

        this.apiService.addHorario(HorarioCadastra).subscribe()
        inicioConsulta.setMinutes(inicioConsulta.getMinutes()+Tempo_Consulta)
        fimConsulta.setMinutes(fimConsulta.getMinutes()+Tempo_Consulta)
      }
      alert("Seus horários foram cadastrados!");
      location.reload();
  }

  deletaHorario(Horario_ID: string) {
    this.apiService.deleteHorario(Horario_ID).subscribe();
    alert("Um horário foi deletado!");
    location.reload();
  }
}
