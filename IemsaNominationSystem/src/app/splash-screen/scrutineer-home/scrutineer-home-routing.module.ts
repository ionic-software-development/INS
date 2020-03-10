import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScrutineerHomePage } from './scrutineer-home.page';

const routes: Routes = [
  {
    path: '',
    component: ScrutineerHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrutineerHomePageRoutingModule {}
