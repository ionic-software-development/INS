import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashScreenPage } from './splash-screen.page';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenPage
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'nominate',
    loadChildren: () => import('./nominate/nominate.module').then( m => m.NominatePageModule)
  },
  {
    path: 'nominees',
    loadChildren: () => import('./nominees/nominees.module').then( m => m.NomineesPageModule)
  },
  {
    path: 'register-nominee',
    loadChildren: () => import('./register-nominee/register-nominee.module').then( m => m.RegisterNomineePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashScreenPageRoutingModule {}
