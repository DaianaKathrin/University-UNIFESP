import { SuasConsultasComponent } from './suas-consultas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaHorarioComponent } from '../busca-horario/busca-horario.component';

const routes: Routes = [
  {
    path: '',
    component: SuasConsultasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuasConsultasComponentRoutingModule { }
