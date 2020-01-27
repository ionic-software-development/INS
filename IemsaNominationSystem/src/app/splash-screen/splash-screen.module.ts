import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashScreenPageRoutingModule } from './splash-screen-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';

import { SplashScreenPage } from './splash-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SplashScreenPageRoutingModule
  ],
  declarations: [SplashScreenPage]
})
export class SplashScreenPageModule {}
