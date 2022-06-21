import { LoginPacienteComponent } from './login-paciente.component';
import { SuasConsultasComponent } from './suas-consultas/suas-consultas.component';
import { ExamesComponent } from './exames/exames.component';
import { HistoricoComponent } from './historico/historico.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaHorarioComponent } from './busca-horario/busca-horario.component';
import { AgendamentoEfetivadoComponent } from './agendamento-efetivado/agendamento-efetivado.component';

const routes: Routes = [
  {
    path: '',
    component: SuasConsultasComponent
  },
  {
    path:'historico',
    component: HistoricoComponent
  },
  {
    path:'exames',
    component: ExamesComponent
  },
  {
    path:'marcar-consulta',
    component: BuscaHorarioComponent
  },
  {
    path: 'efetivar-consulta/:Horario_ID/:Especialidade_ID',
    component: MarcarConsultaComponent
  },
  {
    path: 'agendamento-efetivado/:Consulta_ID',
    component: AgendamentoEfetivadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPacienteRoutingModule { }
