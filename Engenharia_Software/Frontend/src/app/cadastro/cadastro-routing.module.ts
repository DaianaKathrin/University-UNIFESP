import { CadastroComponent } from './../cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente/paciente.component';
import { MedicoComponent } from './medico/medico.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroComponent,
  },
  {
    path: 'paciente',
    component: PacienteComponent
  },
  {
    path: 'medico/:id',
    component: MedicoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
