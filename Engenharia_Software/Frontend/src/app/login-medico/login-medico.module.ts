import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginMedicoRoutingModule } from './login-medico-routing.module';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { HorariosComponent } from './horarios/horarios.component';
import { EspecialidadesComponent } from './Especialidades/Especialidades.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSortModule } from '@angular/material/sort';
import { IniciarSessaoComponent } from './pagina-inicial/iniciar-sessao/iniciar-sessao.component';
import { HistoricoConsultaComponent } from './historico-consulta/historico-consulta.component';
import { ExamesPacienteComponent } from './pagina-inicial/exames-paciente/exames-paciente.component';
import { VerReceitaComponent } from './historico-consulta/ver-receita/ver-receita.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PaginaInicialComponent,
    HorariosComponent,
    EspecialidadesComponent,
    HistoricoConsultaComponent,
    IniciarSessaoComponent,
    ExamesPacienteComponent,
    VerReceitaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginMedicoRoutingModule,
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
    IniciarSessaoComponent,
    ExamesPacienteComponent
  ]
})
export class LoginMedicoModule { }
