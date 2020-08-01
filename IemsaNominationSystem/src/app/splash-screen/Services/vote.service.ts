import { Injectable } from '@angular/core';
import { Vote } from '../models/vote.model';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { NotificationHelperService } from './notification-helper.service';
import * as firebase from 'firebase/app';
import { Nominee } from '../models/nominee';
import { Tracker } from '../models/tracker';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private dbPath = 'votes';
  
  private uidUser = '';
  public voteString = 'votes/';
  private voteref = firebase.database().ref(this.voteString);
  private nomineeRef: AngularFireList<Nominee> = null;
  public uId = '';
  private voteObject: Vote = {
    nominee_uid: '',
    voted_date: new Date().toDateString(),
    voter_uuid: 'scrutineer',
  };
  private nomineeDB = 'nominees';
  constructor(
    public database: AngularFireDatabase,
    public notService: NotificationHelperService,
    private router: Router
  ) {
    this.uId = firebase.auth().currentUser.uid;
    this.nomineeRef = database.list(this.nomineeDB);
  }

  initializeVote() {
    return  this.voteObject;
  }

  getPositionsVoted(): Promise<any> {
    let dummyArray: string[] = [];
    var ref = firebase.database().ref('tracker/' + this.uId);
    if(typeof ref.once('value') === 'undefined'){
      return new Promise((value) => {});
    }
    return ref.once('value');
  }

  vote(uuidVoter: string, candidateId: string, candidate: Nominee) {
    this.notService.presentLoading('Voting... Please Wait');
    this.voteObject.voter_uuid = uuidVoter;
    this.voteObject.nominee_uid = candidateId;
    this.voteString = this.voteString + candidateId;
    this.voteref.set(this.voteObject).then(
      () => {
        // update the nomination
        candidate.vote_count += 1;
        this.nomineeRef.update(candidateId, candidate);
      }
    ).finally(() => {
      this.getById(candidate.position, firebase.auth().currentUser.uid);
    });
  }

  getById(position: string, uuidVoter: string) {
    let uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('tracker/' + uuidVoter);
    let key = null;
    var tempTracker: Tracker = {
      position: '',
    };
    ref.once('value', (snapshot) => {
      key = snapshot.key;
      if(snapshot.val() != null) {
        tempTracker.position = snapshot.val().position;
      }
      this.updateById(tempTracker, position, uuidVoter);
    });
  }
  updateById(tempTracker: Tracker, newPosition: string, uuidVoter: string) {
    var ref = firebase.database().ref('tracker/' + uuidVoter);
    if (tempTracker.position.length < 1) {
      tempTracker.position = newPosition;
      ref.set(tempTracker).finally( () => {
        this.router.navigate(['/splash-screen/vote']);
      });
    } else {
      tempTracker.position = tempTracker.position + ',' + newPosition;
      ref.update(tempTracker).finally(() => {
        this.router.navigate(['/splash-screen/vote']);
      });
    }
  }
}
