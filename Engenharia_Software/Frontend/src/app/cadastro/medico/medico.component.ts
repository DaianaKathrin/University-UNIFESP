import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IConsulta } from 'src/app/interfaces/IConsulta';
import { IEspecialidade } from 'src/app/interfaces/IEspecialidade';
import { IMedico } from 'src/app/interfaces/IMedico';
import { IMedicoEspecialidade } from 'src/app/interfaces/IMedicoEspecialidade';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {

  medico: IMedico | undefined;
  Medico_ID: string | null = "";
  especialidades: IEspecialidade[] = [];
  CRM: string = "";
  conusltas: IConsulta[] = [];

  especialidadeSelecionada: IEspecialidade[] = [];

  constructor(private _Activatedroute: ActivatedRoute, private apiService: ApiService,private router: Router) {
    this.Medico_ID = this._Activatedroute.snapshot.paramMap.get("id");

    apiService.getMedicoById(this.Medico_ID ?? "").subscribe(medico => {
      this.medico = <IMedico>medico
    });
  }

  ngOnInit(): void {
    this.apiService.getEspecialidades().subscribe(data => this.especialidades = data);
  }

  confirmaCadastro(): void {
    if (this.CRM.replace(' ', '') == "") {
      return;
    }

    if (this.especialidadeSelecionada.length == 0) {
      return;
    }
    if (this.medico != null) {
      this.especialidadeSelecionada.forEach(element => {
        let medicoEspecialidade = <IMedicoEspecialidade>{};
        medicoEspecialidade.Especialidade_ID = element.Especialidade_ID;
        medicoEspecialidade.Medico_ID = this.medico?.Medico_ID ?? "";
        medicoEspecialidade.ModeloAnamnese = "";
        this.apiService.addMedicoEspecialidade(medicoEspecialidade).subscribe();
      });


      this.medico!.CRM = this.CRM;
      this.apiService.updateMedico(this.medico, this.medico?.Medico_ID).subscribe();
      this.router.navigate(['home'])
    }

  }


}
