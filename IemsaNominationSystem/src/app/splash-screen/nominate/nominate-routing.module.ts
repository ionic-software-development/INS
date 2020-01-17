import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NominatePage } from './nominate.page';

const routes: Routes = [
  {
    path: '',
    component: NominatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NominatePageRoutingModule {}
