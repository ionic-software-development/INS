import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScrutineerHomePageRoutingModule } from './scrutineer-home-routing.module';

import { ScrutineerHomePage } from './scrutineer-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrutineerHomePageRoutingModule
  ],
  declarations: [ScrutineerHomePage]
})
export class ScrutineerHomePageModule {}
