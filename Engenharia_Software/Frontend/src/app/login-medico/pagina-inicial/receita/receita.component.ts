import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit {

  file: File | null = null;
  fileSelected:boolean = false;
  constructor(private apiService: ApiService, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
  }

  selecionaArquivo(event: any) {
    this.file = event.target.files[0];
    this.fileSelected = true;
  }

  fazerUpload(): void{
    if(this.fileSelected && this.file != null){
      const formData = new FormData(); 
      formData.append("file", this.file, this.file.name);
      let Consulta_ID = localStorage.getItem('Consulta_ID')
      this.apiService.addReceita(Consulta_ID??"",formData).subscribe(data => {},error => console.log(error))
      localStorage.removeItem('Consulta_ID');
      alert("Receita adicionada com sucesso!");
    }
  }
}
