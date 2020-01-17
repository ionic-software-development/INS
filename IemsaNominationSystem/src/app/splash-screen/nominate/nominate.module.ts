import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NominatePageRoutingModule } from './nominate-routing.module';

import { NominatePage } from './nominate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NominatePageRoutingModule
  ],
  declarations: [NominatePage]
})
export class NominatePageModule {}
