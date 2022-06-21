import { Component, OnInit } from '@angular/core';
import { IExame } from 'src/app/interfaces/IExame';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-exames-paciente',
  templateUrl: './exames-paciente.component.html',
  styleUrls: ['./exames-paciente.component.scss']
})
export class ExamesPacienteComponent implements OnInit {
  exames: IExame [] = []
  
  displayedColumns: string[] = ['download', 'filename', 'type', 'created_at'];
  dataSource = this.exames;
  Consulta_ID: string = ""

  constructor(private apiService:ApiService) { 
    this.Consulta_ID = localStorage.getItem('Consulta_ID')??"";
    localStorage.removeItem('Consulta_ID')
    apiService.getExamesByConsulta(this.Consulta_ID).subscribe(data => this.exames = data);
    this.dataSource = this.exames;
  }

  ngOnInit(): void {
  }

  ExameDowload(Exame_ID: string): void {
    console.log(Exame_ID);
    this.apiService.getExame(Exame_ID).subscribe((response: any) => {
      const url = window.URL.createObjectURL(response);
      window.open(url);
    });

  }

}
