import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNomineePage } from './update-nominee.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateNomineePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateNomineePageRoutingModule {}
