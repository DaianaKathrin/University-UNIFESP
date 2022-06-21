import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ILogin } from '../interfaces/ILogin';
import { IMedico } from '../interfaces/IMedico';
import { IPaciente } from '../interfaces/IPaciente';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private _usuarioLogado = new BehaviorSubject<boolean>(false);
  usuarioLogado = this._usuarioLogado.asObservable();
  constructor(private apiService: ApiService) {
    const token = localStorage.getItem('hawk_medical');
    this._usuarioLogado.next(!!token);
   }

  autenticaPaciente(username: string, password: string): Observable<IPaciente> {
    let login = <ILogin>{};
    login.Email = username;
    login.Senha = password;

    return this.apiService.loginPaciente(login).pipe(
      tap((response:any)=>{
        this._usuarioLogado.next(true);
        localStorage.setItem('hawk_medical',response.Paciente_ID)
      })
    );

  }

  autenticaMedico(username: string, password: string): Observable<IMedico> {
    let login = <ILogin>{};
    login.Email = username;
    login.Senha = password;

    return this.apiService.loginMedico(login).pipe(
      tap((response:any)=>{
        this._usuarioLogado.next(true);
        localStorage.setItem('hawk_medical',response.Medico_ID)
      })
    );
  }
}
