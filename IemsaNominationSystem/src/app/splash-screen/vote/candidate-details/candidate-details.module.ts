import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateDetailsPageRoutingModule } from './candidate-details-routing.module';

import { CandidateDetailsPage } from './candidate-details.page';
import { NomineeService } from './../../Services/nominee.service';
import { Nominee } from './../../models/nominee';
import { ActivatedRoute } from '@angular/router';
import { AngularFireObject } from '@angular/fire/database';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidateDetailsPageRoutingModule
  ],
  declarations: [CandidateDetailsPage]
})
export class CandidateDetailsPageModule {
}
