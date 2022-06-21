import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';

@Component({
  selector: 'app-login-paciente',
  templateUrl: './login-paciente.component.html',
  styleUrls: ['./login-paciente.component.scss']
})
export class LoginPacienteComponent implements OnInit {

  constructor(public auth:AutenticacaoService) { }

  ngOnInit(): void {
  }

}
