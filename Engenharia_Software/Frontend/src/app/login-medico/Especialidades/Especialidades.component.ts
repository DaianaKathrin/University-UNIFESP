import { Component, OnInit } from '@angular/core';
import { IMedico } from 'src/app/interfaces/IMedico';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEspecialidade } from 'src/app/interfaces/IEspecialidade';
import { IMedicoEspecialidade } from 'src/app/interfaces/IMedicoEspecialidade';

@Component({
  selector: 'app-Especialidades',
  templateUrl: './Especialidades.component.html',
  styleUrls: ['./Especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  displayedColumns: string[] = ['especialidade','anamnese', 'delete'];
  medico: IMedico | undefined;
  especialidades: IEspecialidade[] = []
  Medico_ID: string | null =  localStorage.getItem('hawk_medical');
  form: FormGroup;
  submmited: boolean = false;
  especialidadesanam:IMedicoEspecialidade;
  Especialidades: IMedicoEspecialidade[] = [];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.apiService.getMedicoById(this.Medico_ID ?? "").subscribe(medico => {
      this.medico = <IMedico>medico;
    });

    this.apiService.getMedicoEspecialidades(this.Medico_ID ?? "").subscribe(especialidadesanam => {
      this.Especialidades = <IMedicoEspecialidade[]>especialidadesanam;

      console.log(this.Especialidades); 
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.apiService.getEspecialidades().subscribe(data => this.especialidades = data);
  }

  createForm() {
    this.form = this.fb.group({
      Anamnese: [null],
      Especialidade: [null]
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  AdicionaAnamnese(){

    let EspAnam = <IMedicoEspecialidade>{}
    EspAnam.Especialidade_ID = this.form.value.Especialidade;
    EspAnam.Medico_ID = this.medico?.Medico_ID ?? "";
    EspAnam.ModeloAnamnese = this.form.value.Anamnese;

    alert("Especialidade e anamnese cadastrada!");
    location.reload();
    this.apiService.addMedicoEspecialidade(EspAnam).subscribe()
  }

  selecionaEspecialidade(value: string) {
    console.log(value);
  }

  deletaEspecialidade(MedicoEspecialidade_ID: string) {

    this.apiService.deleteEspecialidade(MedicoEspecialidade_ID).subscribe();
    alert("Especialidade deletada!");
    location.reload();
  }
  entrarAnamnese(ModeloAnamnese: string){

    window.open(ModeloAnamnese);

  }
}
