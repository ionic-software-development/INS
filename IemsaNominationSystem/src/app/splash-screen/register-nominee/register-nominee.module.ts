import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterNomineePageRoutingModule } from './register-nominee-routing.module';

import { RegisterNomineePage } from './register-nominee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterNomineePageRoutingModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegisterNomineePage]
})
export class RegisterNomineePageModule {}
