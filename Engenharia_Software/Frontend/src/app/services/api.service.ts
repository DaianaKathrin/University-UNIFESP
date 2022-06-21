import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IConfig } from '../interfaces/IConfig';
import { IConsulta } from '../interfaces/IConsulta';
import { IEspecialidade } from '../interfaces/IEspecialidade';
import { ILogin } from '../interfaces/ILogin';
import { IMedico } from '../interfaces/IMedico';
import { IMedicoEspecialidade } from '../interfaces/IMedicoEspecialidade';
import { IMedicoHorarios } from '../interfaces/IMedicoHorarios';
import { IPaciente } from '../interfaces/IPaciente';
import {formatDate} from '@angular/common';
import { IHorario } from '../interfaces/IHorario';
import { IConsultaAgendar } from '../interfaces/IConsultaAgendar';
import { IExame } from '../interfaces/IExame';
import { IConsultaExame } from '../interfaces/IConsultaExame';
import { ICategoriaExame } from '../interfaces/ICategoriaExame';
import { IReceita } from '../interfaces/IReceita';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    baseUrl = 'https://hawkmedical.herokuapp.com';

    constructor(private http: HttpClient) { }

    addMedico(medico: IMedico): Observable<IMedico> {
        return this.http.post<IMedico>(this.baseUrl + '/Medico', medico)
            .pipe(
                catchError(this.handleError)
            );
    }

    getMedicoById(Medico_ID: string): Observable<IMedico> {
        return this.http.get<IMedico>(this.baseUrl + '/Medico/' + Medico_ID)
    }

    getPacienteById(Paciente_ID: string): Observable<IPaciente> {
        return this.http.get<IPaciente>(this.baseUrl + '/Paciente/' + Paciente_ID)
    }

    getExamesByPaciente(Paciente_ID: string): Observable<IExame[]> {
        return this.http.get<IExame[]>(this.baseUrl + '/Paciente/' + Paciente_ID + '/Exames')
    }

    getReceitasByPaciente(Paciente_ID: string): Observable<IReceita[]> {
        return this.http.get<IReceita[]>(this.baseUrl + '/Paciente/' + Paciente_ID + '/Receitas')
    }

    getExamesByConsulta(Consulta_ID: string): Observable<IExame[]> {
        return this.http.get<IExame[]>(this.baseUrl + '/Consulta/' + Consulta_ID + '/Exame')
    }
    getReceitasByConsultaID(consultaID: string): Observable<IReceita[]> {
        return this.http.get<IReceita[]>(this.baseUrl + '/Consulta/' + consultaID + '/Receita' );
    }
    getConsultaById(Consulta_ID: string): Observable<IConsulta> {
        return this.http.get<IConsulta>(this.baseUrl + '/Consulta/' + Consulta_ID)
    }
    
    getMedicoEspecialidade(Medico_ID: string, Especialidade_ID:string): Observable<IMedicoEspecialidade> {
        return this.http.get<IMedicoEspecialidade>(this.baseUrl + '/Medico/' + Medico_ID+'/Especialidade/'+Especialidade_ID)
    }

    getMedicoEspecialidades(Medico_ID: string): Observable<IMedicoEspecialidade[]> {
        return this.http.get<IMedicoEspecialidade[]>(this.baseUrl + '/Medico/' + Medico_ID+'/Especialidades/')
    }

    getEspecialidadeById(Especialidade_ID: string): Observable<IEspecialidade> {

        return this.http.get<IEspecialidade>(this.baseUrl + '/Especialidade/' + Especialidade_ID)
    }

    deleteHorario(Horario_ID: string): Observable<IHorario> {
        return this.http.delete<IHorario>(this.baseUrl + '/Horario/' + Horario_ID).pipe(
            catchError(this.handleError)
        );
    }

    deleteEspecialidade(MedicoEspecialidade_ID:string): Observable<IMedicoEspecialidade> {
        return this.http.delete<IMedicoEspecialidade>(this.baseUrl + '/Medico/Especialidade/' + MedicoEspecialidade_ID).pipe(
            catchError(this.handleError)
        );
    }

    getEspecialidades(): Observable<IEspecialidade[]> {
        return this.http.get<IEspecialidade[]>(this.baseUrl + '/Especialidade/')
    }

    getCategoriasExame(): Observable<ICategoriaExame[]> {
        return this.http.get<ICategoriaExame[]>(this.baseUrl + '/Exame/Categoria')
    }

    getConsultasPaciente(Paciente_ID:string): Observable<IConsulta[]> {
        return this.http.get<IConsulta[]>(this.baseUrl + '/Paciente/'+Paciente_ID+'/Consultas')
    }

    getConsultasMedico(Medico_ID:string): Observable<IConsulta[]> {
        return this.http.get<IConsulta[]>(this.baseUrl + '/Medico/'+Medico_ID+'/Consultas')
    }


    getHorariosMedico(Especialidade_ID:string, Data:Date): Observable<IMedicoHorarios[]> {
        return this.http.get<IMedicoHorarios[]>(this.baseUrl + '/Medico/Especialidade/'+Especialidade_ID+'?data='+formatDate(Data,'yyyy-MM-dd','en-US'))
    }

    getHorarioById(Horario_ID: string): Observable<IHorario> {
        return this.http.get<IHorario>(this.baseUrl + '/Horario/' + Horario_ID)
    }

    getAllHorariosMedicos(): Observable<IHorario[]> {
        return this.http.get<IHorario[]>(this.baseUrl + '/Horario/')
    }

    getHorariosByMedicoId(Medico_ID: string): Observable<IHorario[]> {
        return this.http.get<IHorario[]>(this.baseUrl + '/Medico/' + Medico_ID + '/Horarios').
        pipe(
            catchError(this.handleError)
        );
    }

    addPaciente(paciente: IPaciente): Observable<IPaciente> {
        return this.http.post<IPaciente>(this.baseUrl + '/Paciente', paciente)
            .pipe(
                catchError(this.handleError)
            );
    }

    getConsugeltas(): Observable<IConsulta[]> {
        return this.http.get<IConsulta[]>(this.baseUrl + '/Consulta')
    }

    getConsultas(): Observable<IConsulta[]> {
        return this.http.get<IConsulta[]>(this.baseUrl + '/Consulta')
    }

    addConsulta(consulta: IConsultaAgendar): Observable<IConsulta> {
        return this.http.post<IConsulta>(this.baseUrl + '/Consulta', consulta)
            .pipe(
                catchError(this.handleError)
            );
    }

    addHorario(horario: IHorario): Observable<IHorario> {
        return this.http.post<IHorario>(this.baseUrl + '/Horario', horario)
    }
    addExame(categoria: string, descricao:string, file:FormData, Paciente_ID:string): Observable<any> {
        return this.http.post<IConsulta>(this.baseUrl + '/Exame/?Descricao='+descricao+'&CategoriaExame_ID='+categoria+'&Paciente_ID='+Paciente_ID, file)
            .pipe(
                catchError(this.handleError)
            );
    }

    addReceita(Consulta_ID:string, file:FormData): Observable<any> {
        return this.http.post<IConsulta>(this.baseUrl + '/Receita/?Consulta_ID='+Consulta_ID, file)
            .pipe(
                catchError(this.handleError)
            );
    }

    addMedicoEspecialidade(medicoEspecialidade: IMedicoEspecialidade): Observable<IMedicoEspecialidade> {
        return this.http.post<IMedicoEspecialidade>(this.baseUrl + '/Medico/Especialidade', medicoEspecialidade)
            .pipe(
                catchError(this.handleError)
            );
    }

    addConsultaExame(consultaExame: IConsultaExame): Observable<IConsultaExame> {
        return this.http.post<IConsultaExame>(this.baseUrl + '/Consulta/Exame', consultaExame)
            .pipe(
                catchError(this.handleError)
            );
    }


    updateMedico(medico: IMedico, Medico_ID: string): Observable<IMedico> {
        return this.http.put<IMedico>(this.baseUrl + '/Medico/' + Medico_ID, medico)
            .pipe(
                catchError(this.handleError)
            );
    }

    loginMedico(login: ILogin): Observable<IMedico> {
        return this.http.post<IMedico>(this.baseUrl + '/Medico/Login', login)
            .pipe(
                catchError(this.handleError)
            );
    }

    loginPaciente(login: ILogin): Observable<IPaciente> {
        return this.http.post<IPaciente>(this.baseUrl + '/Paciente/Login', login)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateStatusConsulta(consultaID: string, status: number): Observable<string> {
        interface AttStatus { Status: number; };
        var obj: AttStatus;
        obj = { Status: status};
        
        return this.http.post<string>(this.baseUrl + '/Consulta/' + consultaID + '/Status', obj)
            .pipe(
                catchError(this.handleError)
            );
    }

    getExames(consultaID: string): Observable<IExame[]> {
        return this.http.get<IExame[]>(this.baseUrl + '/Consulta' + consultaID);
    }

    getExame(Exame_ID: string):any{
        return this.http.get(this.baseUrl + '/Exame/' + Exame_ID, {responseType: 'blob'});
    }

    getReceita(Receita_ID: string):any{
        return this.http.get(this.baseUrl + '/Receita/' + Receita_ID, {responseType: 'blob'});
    }

    addLinkMeet(Consulta_ID: string, linkMeet: string): Observable<IConsulta> {
        return this.http.post<IConsulta>(this.baseUrl + '/Consulta', Consulta_ID + 'LinkMeet' + linkMeet)
            .pipe(
                catchError(this.handleError)
            );
    }

    removeExame(Exame_ID: string):any{
        return this.http.delete(this.baseUrl + '/Exame/' + Exame_ID)
    }

    /* addLinkMeet(Consulta_ID: string, linkMeet: string): Observable<IConsulta> {
        return this.http.post<IConsulta>(this.baseUrl + '/Consulta/' + Consulta_ID + 'LinkMeet' + linkMeet)
        .pipe(
            catchError(this.handleError)
        );
    } */

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }
}

