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
    loadChildren: () => import('./register-scrutineer/register.module').then( m => m.RegisterPageModule)
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
  },
  {
    path: 'register-admin',
    loadChildren: () => import('./register-admin/register-admin.module').then( m => m.RegisterAdminPageModule)
  },
  {
    path: 'scrutineer-home',
    loadChildren: () => import('./scrutineer-home/scrutineer-home.module').then( m => m.ScrutineerHomePageModule)
  },  {
    path: 'register-member',
    loadChildren: () => import('./register-member/register-member.module').then( m => m.RegisterMemberPageModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./vote/vote.module').then( m => m.VotePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashScreenPageRoutingModule {}
