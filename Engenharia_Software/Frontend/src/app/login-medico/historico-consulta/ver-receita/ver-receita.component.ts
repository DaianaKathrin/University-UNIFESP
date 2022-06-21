import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IReceita } from 'src/app/interfaces/IReceita';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ver-receita',
  templateUrl: './ver-receita.component.html',
  styleUrls: ['./ver-receita.component.scss']
})
export class VerReceitaComponent implements OnInit {
  
  receitas: IReceita [] = [];
  displayedColumns: string[] = ['nomeArquivo','arquivo'];
  dataSource = this.receitas;
  Paciente_ID: string = "";


  constructor(private apiService: ApiService) {
    this.Paciente_ID = localStorage.getItem('Paciente_ID')??"";
    localStorage.removeItem('Paciente_ID');
    apiService.getReceitasByPaciente(this.Paciente_ID).subscribe(data => this.receitas = data);
    this.dataSource = this.receitas;
    console.log(this.receitas)
   }

  ngOnInit(): void {
    console.log(this.receitas);
  }

  receitaDownload(Receita_ID: string): void {
    this.apiService.getReceita(Receita_ID).subscribe((response: any) => {
      const url = window.URL.createObjectURL(response);
      window.open(url);
    });
  }

}
