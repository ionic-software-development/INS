import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash-screen', pathMatch: 'full' },
  {
    path: 'splash-screen',
    children: [
      {
        path: '',
        loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./splash-screen/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./splash-screen/register-scrutineer/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'nominate',
        loadChildren: () => import('./splash-screen/nominate/nominate.module').then(m => m.NominatePageModule)
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
