import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterMemberPageRoutingModule } from './register-member-routing.module';

import { RegisterMemberPage } from './register-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterMemberPageRoutingModule
  ],
  declarations: [RegisterMemberPage]
})
export class RegisterMemberPageModule {}
