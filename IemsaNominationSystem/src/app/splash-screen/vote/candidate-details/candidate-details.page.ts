import { NomineeService } from './../../Services/nominee.service';
import { Nominee } from './../../models/nominee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {
  private candidateId: string;
  private candidateOb: AngularFireObject<any>;
  public candidate: Nominee;
  constructor(
    private activatedRoute: ActivatedRoute,
    private nomineeService: NomineeService

  ) {
    this.candidate = nomineeService.initializeNominee();
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('candidateId')) {
          return;
        }
        // Initialize an empty nominee
        // Without this line, code returns that newNom is null
        // this.newNom = nomineeService.initializeNominee();
        // Get the nomination ID of the nominee from the router
        this.candidateId = paramMap.get('candidateId');
        // Use the nomination ID to find the nominee in the database
        this.candidateOb = this.nomineeService.getNominee(this.candidateId);
        this.candidateOb.snapshotChanges().subscribe(action => {
          this.candidate = Object.assign(this.candidate, action.payload.val());
        });
        console.log('Candidate is: ' + this.candidate.firstName);
        // this.nominee.snapshotChanges().subscribe(action => {
        //   this.newNom = Object.assign(this.newNom, action.payload.val());
        // });
      }
    );
  }

  ngOnInit() {
  }

}
