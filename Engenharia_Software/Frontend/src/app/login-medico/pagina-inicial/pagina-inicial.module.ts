import { MatIconModule } from '@angular/material/icon';
import { TemplatePrincipalComponent } from './../../shared/template-principal/template-principal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaInicialRoutingModule } from './pagina-inicial-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OverlayModule } from '@angular/cdk/overlay';
import { IniciarSessaoComponent } from './iniciar-sessao/iniciar-sessao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatDialogModule} from '@angular/material/dialog';
import { ExamesPacienteComponent } from './exames-paciente/exames-paciente.component';
import { ReceitaComponent } from './receita/receita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IniciarSessaoComponent,
    ExamesPacienteComponent,
    ReceitaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PaginaInicialRoutingModule,
    TemplatePrincipalComponent,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    MatDialogModule,
  ],
  exports:[FormsModule,ReactiveFormsModule],
  entryComponents:[ReceitaComponent],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginaInicialModule { }
