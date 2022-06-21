import { AutenticacaoService } from './../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario = '';
  senha = '';
  tipoUsuario:number = 1;
  constructor(private authService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.tipoUsuario == 1) {
      this.authService.autenticaPaciente(this.usuario, this.senha).subscribe(
        (response) => {
          {
            localStorage.setItem('hawk_medical', response.Paciente_ID)
            console.log(response.Paciente_ID);
            this.router.navigate(['/paciente']);
          }
        }
      );
    }
    else if (this.tipoUsuario == 2) {
      this.authService.autenticaMedico(this.usuario, this.senha).subscribe(
        (response) => {
          {
            localStorage.setItem('hawk_medical', response.Medico_ID)
            console.log(response.Medico_ID);
            this.router.navigate(['/loginmedico']);
          }
        }
      );
    }
  }
}
