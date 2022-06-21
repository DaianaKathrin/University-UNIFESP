import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ICategoriaExame } from 'src/app/interfaces/ICategoriaExame';
import { ApiService } from 'src/app/services/api.service';

@Component({
  templateUrl: './novo-exame.component.html',
  styleUrls: ['./novo-exame.component.scss']
})
export class NovoExameComponent implements OnInit {

  file: File; 
  form!: FormGroup;
  categorias:ICategoriaExame[]= []
  constructor(private apiService: ApiService, private fb: FormBuilder) { 
    apiService.getCategoriasExame().subscribe(data => this.categorias = data);
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      file: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  selecionaArquivo(event: any) {
    this.file = event.target.files[0];
  }

  fazerUpload(): void{
    if (this.form.valid) {
      const formData = new FormData(); 
      formData.append("file", this.file, this.file.name);
      this.apiService.addExame(this.form.value['categoria'],this.form.value['descricao'],formData,localStorage.getItem('hawk_medical')).subscribe(data => {},error => console.log(error))
    }
    
  }

}
