import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNomineePageRoutingModule } from './update-nominee-routing.module';

import { UpdateNomineePage } from './update-nominee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateNomineePageRoutingModule
  ],
  declarations: [UpdateNomineePage]
})
export class UpdateNomineePageModule {}
