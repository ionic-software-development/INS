import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterNomineePage } from './register-nominee.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterNomineePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterNomineePageRoutingModule {}
