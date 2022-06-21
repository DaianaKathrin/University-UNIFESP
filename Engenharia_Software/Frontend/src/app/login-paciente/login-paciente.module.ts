import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoginPacienteRoutingModule } from './login-paciente-routing.module';
import { SuasConsultasComponent } from './suas-consultas/suas-consultas.component';
import { BuscaHorarioComponent } from './busca-horario/busca-horario.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HistoricoComponent } from './historico/historico.component';
import { ExamesComponent } from './exames/exames.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AgendamentoEfetivadoComponent } from './agendamento-efetivado/agendamento-efetivado.component';
import { NovoExameComponent } from './exames/novo-exame/novo-exame.component';
import { SharedModule } from '../shared/shared.module';
import { AddExameComponent } from './suas-consultas/add-exame/add-exame.component';
import { DetalhesConsultaComponent } from './historico/detalhes-consulta/detalhes-consulta.component';

@NgModule({
  declarations: [
    SuasConsultasComponent,
    BuscaHorarioComponent,
    HistoricoComponent,
    ExamesComponent,
    MarcarConsultaComponent,
    NovoExameComponent,
    AgendamentoEfetivadoComponent,
    AddExameComponent,
    DetalhesConsultaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    LoginPacienteRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    OverlayModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    OverlayModule,
    NgSelectModule,
    FormsModule
  ],
  entryComponents:[
    NovoExameComponent,
    AddExameComponent
  ]
})
export class LoginPacienteModule { }
