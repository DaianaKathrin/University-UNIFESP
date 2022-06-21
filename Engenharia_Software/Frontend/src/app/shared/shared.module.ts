import { TemplatePrincipalComponent } from './template-principal/template-principal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SidemenuMedicoComponent } from './sidemenu-medico/sidemenu-medico.component';
import { SidemenuPacienteComponent } from './sidemenu-paciente/sidemenu-paciente.component';

@NgModule({
  declarations: [
    TemplatePrincipalComponent,
    BackgroundComponent,
    SidemenuPacienteComponent,
    SidemenuMedicoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    OverlayModule
  ],
  exports: [
    TemplatePrincipalComponent,
    BackgroundComponent,
    SidemenuPacienteComponent,
    SidemenuMedicoComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
