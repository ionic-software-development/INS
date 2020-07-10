import { Component, OnInit } from '@angular/core';
import { NomineeService } from './../../Services/nominee.service';
import { Nominee } from './../../models/nominee';
import { ActivatedRoute } from '@angular/router';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { VoteService } from '../../Services/vote.service';
import * as firebase from 'firebase/app';
import { Vote } from '../../models/vote.model';
import { Tracker } from '../../models/tracker';
import { stringify } from 'querystring';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {

  private candidateId: string;
  private candidateOb: AngularFireObject<any>;
  public candidate: Nominee;
  public voteObject: Vote;
  fileLocation = 'assets/think.jpg';
  public dbPath = 'votes';
  public uidVoter = '';
  constructor(
    public activatedRoute: ActivatedRoute,
    public nomineeService: NomineeService,
    public voteService: VoteService,
    public database: AngularFireDatabase,

  ) {
    this.candidate = nomineeService.initializeNominee();
    this.voteObject = voteService.initializeVote();

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
        this.uidVoter = firebase.auth().currentUser.uid;
        console.log('Candidate is: ' + this.candidateId);
        console.log('Voter is: ' + this.uidVoter);
        // this.nominee.snapshotChanges().subscribe(action => {
        //   this.newNom = Object.assign(this.newNom, action.payload.val());
        // });
      }
    );

  }

  ngOnInit() {
  }

  requestToVote() {
    this.voteService.vote(this.uidVoter, this.candidateId,  this.candidate);
  }
}
