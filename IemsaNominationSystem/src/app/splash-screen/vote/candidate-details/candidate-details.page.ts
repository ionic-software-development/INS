import { Component, OnInit } from '@angular/core';
import { NomineeService } from './../../Services/nominee.service';
import { Nominee } from './../../models/nominee';
import { ActivatedRoute } from '@angular/router';
<<<<<<< Updated upstream
import { AngularFireObject } from '@angular/fire/database';
=======
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { VoteService } from '../../Services/vote.service';
import * as firebase from 'firebase/app';
import { Vote } from '../../models/vote.model';
import { Tracker } from '../../models/tracker.model';
import { map } from 'rxjs/operators';
>>>>>>> Stashed changes

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {

  private candidateId: string;
  private candidateOb: AngularFireObject<any>;
  public candidate: Nominee;
  fileLocation = '/assets/person.png';
<<<<<<< Updated upstream
=======
  private trackerRef: AngularFireList<Tracker> = null;
  private trackerDBPath = 'tracker';
  trackerRefObject: AngularFireObject<any>;

  private trackerOb: Tracker = {
    position: '',
    votedMembersUid: ''
  };
  public dbPath = 'votes';
  private nomineeDB = 'nominees';
  private voteRef: AngularFireList<Vote> = null;
  private nomineeRef: AngularFireList<Nominee> = null;
>>>>>>> Stashed changes
  constructor(
    private activatedRoute: ActivatedRoute,
    private nomineeService: NomineeService

  ) {
    this.candidate = nomineeService.initializeNominee();
<<<<<<< Updated upstream
=======
    this.voteObject = voteService.initializeVote();
    this.voteRef = database.list(this.dbPath);
    this.nomineeRef = database.list(this.nomineeDB);
    this.trackerRef = database.list(this.trackerDBPath);

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
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
    ).then(
      () => {
         // Update the tracker object
         this.updateTracker();
         this.updateTrackerObject(this.trackerOb.votedMembersUid);
      }
    ).catch(
      error => {
        //this.notService.presentToast(error.message);
      }
    );
  }

  updateTracker(){
    this.trackerOb.position = this.candidate.position;
    this.trackerOb.votedMembersUid = firebase.auth().currentUser.uid;


    this.trackerRef.push(this.trackerOb).then(
      (key) => {
        this.trackerRef.update(this.trackerOb.position, this.trackerOb);
        this.trackerRefObject = this.database.object('tracker/' + this.trackerOb.position);
        this.updateTrackerObject(this.trackerOb.votedMembersUid);
      }
    );

  }

  updateTrackerObject(memberUid) {
    this.trackerRefObject.snapshotChanges().subscribe(action => {
      let temp = action.payload.val();
      console.log('VoterObject is' + temp.position);
      if (temp) {
        // user is an scrutineer
        // if (temp.userRole === 'admin') {
        //   // Check the type of user. Redirect to relevant 'screen'
        //   // this.navigateToAdmin();
        // }
      }
    });
  }
>>>>>>> Stashed changes
}
