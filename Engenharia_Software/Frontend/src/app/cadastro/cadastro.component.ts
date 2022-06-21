import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMedico } from '../interfaces/IMedico';
import { IPaciente } from '../interfaces/IPaciente';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  form!: FormGroup;
  submmited: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Nome: [null, [Validators.required, Validators.maxLength(255)]],
      Data_Nascimento: [null, Validators.required],
      CPF: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      Cidade: [null, Validators.required],
      Estado: [null, Validators.required],
      Logradouro: [null, Validators.required],
      Logradouro_Numero: [null, Validators.required],
      CEP: [null, [Validators.required, Validators.maxLength(8)]],
      Telefone: [null, Validators.maxLength(11)],
      Celular: [null, Validators.maxLength(11)],
      Email: [null, [Validators.required, Validators.email]],
      Senha: [null, [Validators.required]],
      ConfirmaSenha: [null, [Validators.required]]
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmitPaciente() {
    this.submmited = true;
    if (this.form.valid) {
      let paciente: IPaciente;
      paciente = this.form.value;
      //call service method to send register to API
      this.apiService.addPaciente(paciente).subscribe(success => this.router.navigate(['home']), error => console.log(error));
    }
  }

  onSubmitMedico() {
    this.submmited = true;
    console.log(this.form.value);
    if (this.form.valid) {
      let medico: IMedico;
      medico = this.form.value;
      let response: IMedico;
      this.apiService.addMedico(medico).subscribe(data=>{
                                                            console.log(data);
                                                            this.router.navigate(['medico',data.Medico_ID])}, (error) => console.log(error));
    }
  }

}





