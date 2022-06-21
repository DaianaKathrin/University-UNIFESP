import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './cadastro/medico/medico.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'medico/:id',
    component: MedicoComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then((m) => m.CadastroModule),
  },
  {
    path: 'paciente',
    loadChildren: () => import('./login-paciente/login-paciente.module').then((m) => m.LoginPacienteModule),
  },
  {
    path: 'loginmedico',
    loadChildren: () => import('./login-medico/login-medico.module').then((m) => m.LoginMedicoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
