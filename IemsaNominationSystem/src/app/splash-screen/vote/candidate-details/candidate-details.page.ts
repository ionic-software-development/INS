import { Component, OnInit } from '@angular/core';
import { NomineeService } from './../../Services/nominee.service';
import { Nominee } from './../../models/nominee';
import { ActivatedRoute } from '@angular/router';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { VoteService } from '../../Services/vote.service';
import * as firebase from 'firebase/app';
import { Vote } from '../../models/vote.model';

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
  fileLocation = '/assets/person.png';

  public dbPath = 'votes';
  private nomineeDB = 'nominees';
  private voteRef: AngularFireList<Vote> = null;
  private nomineeRef: AngularFireList<Nominee> = null;
  constructor(
    public activatedRoute: ActivatedRoute,
    public nomineeService: NomineeService,
    public voteService: VoteService,
    public database: AngularFireDatabase,

  ) {
    this.candidate = nomineeService.initializeNominee();
    this.voteObject = voteService.initializeVote();
    this.voteRef = database.list(this.dbPath);
    this.nomineeRef = database.list(this.nomineeDB);
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

  requestToVote() {
    console.log('Voted by: ' + firebase.auth().currentUser.uid + '. Voted for: ' + this.candidateId);
    this.vote(firebase.auth().currentUser.uid, this.candidateId);
  }

  vote(uuidVoter: string, uuidRecipient: string) {
    this.voteObject.voter_uuid = uuidVoter;
    this.voteObject.nominee_uid = uuidRecipient;
    this.voteRef.push(this.voteObject).then(
      (key) => {
        this.voteRef.update(this.voteObject.voter_uuid, this.voteObject);
        // update the nomination
        this.candidate.vote_count += 1;
        this.nomineeRef.update(this.candidateId, this.candidate);
        // this.notService.presentToast('Successfully Registered New Nominee');
        // this.router.navigate(['/splash-screen/nominees']);
      }
    ).catch(
      error => {
        //this.notService.presentToast(error.message);
      }
    );
  }
}
