import { CandidateDetailsPage } from './candidate-details/candidate-details.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotePage } from './vote.page';

const routes: Routes = [
  {
    path: '',
    component: VotePage
  },
  {
    path: ':candidateId',
    loadChildren: () => import('./candidate-details/candidate-details.module').then( m => m.CandidateDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotePageRoutingModule {}
