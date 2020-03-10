import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterMemberPage } from './register-member.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterMemberPageRoutingModule {}
