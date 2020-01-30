import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NomineesPage } from './nominees.page';

const routes: Routes = [
  {
    path: '',
    component: NomineesPage,
  },
  {
    path: ':nomineeId',
    loadChildren: () => import('./update-nominee/update-nominee.module').then(m => m.UpdateNomineePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NomineesPageRoutingModule {}
