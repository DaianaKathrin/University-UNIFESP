//import { LoginPacienteComponent } from './login-paciente.component';
//import { SuasConsultasComponent } from './suas-consultas/suas-consultas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadesComponent } from './Especialidades/Especialidades.component';
import { HorariosComponent } from './horarios/horarios.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { HistoricoConsultaComponent } from './historico-consulta/historico-consulta.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent
  },
  {
    path: 'paginainicial',
    component: PaginaInicialComponent
  },
  {
    path: 'horarios',
    component: HorariosComponent
  },
  {
    path: 'Especialidades',
    component: EspecialidadesComponent
  },
  {
    path: 'historico-consulta',
    component: HistoricoConsultaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginMedicoRoutingModule { }
