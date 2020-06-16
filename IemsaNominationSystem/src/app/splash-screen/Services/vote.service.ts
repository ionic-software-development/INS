import { Injectable } from '@angular/core';
import { Vote } from '../models/vote.model';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { NotificationHelperService } from './notification-helper.service';
import * as firebase from 'firebase/app';
import { splitAtColon } from '@angular/compiler/src/util';
import { stringify } from 'querystring';
import { Nominee } from '../models/nominee';
import { Tracker } from '../models/tracker';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private dbPath = 'votes';
  
  private uidUser = '';
  private voteRef: AngularFireList<Vote> = null;
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
    this.voteRef = database.list(this.dbPath);
    this.uId = firebase.auth().currentUser.uid;
    this.nomineeRef = database.list(this.nomineeDB);
  }

  initializeVote() {
    return  this.voteObject;
  }

  getPositionsVoted(): Promise<any> {
    let dummyArray: string[] = [];
    var ref = firebase.database().ref('tracker/' + this.uId);
    return ref.once('value');
    // await ref.once('value').then(
    //   (snapshot) => {
    //     if (snapshot.val() != null) {
    //       return  snapshot.val().position.split(' ');
    //     } else {
    //       return dummyArray;
    //     }
    //   }
    // );
  }

  vote(uuidVoter: string, candidateId: string, candidate: Nominee) {
    this.notService.presentLoading('Voting... Please Wait');
    console.log('Voted by: ' + this.uidUser + '. Voted for: ' + candidateId);
    this.voteObject.voter_uuid = uuidVoter;
    this.voteObject.nominee_uid = candidateId;
    this.voteRef.push(this.voteObject).then(
      (key) => {
        this.voteRef.update(this.voteObject.voter_uuid, this.voteObject);
        // update the nomination
        candidate.vote_count += 1;
        this.nomineeRef.update(candidateId, candidate);
        // this.notService.presentToast('Successfully Registered New Nominee');
        // this.router.navigate(['/splash-screen/nominees']);
      }
    ).catch(
      error => {
        //this.notService.presentToast(error.message);
      }
    ).finally(() => {
      this.getById(candidate.position, firebase.auth().currentUser.uid);
    });
  }

  getById(position: string, uuidVoter: string) {
    console.log('In getById(): ' + uuidVoter);
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
    console.log('In updateById()');
    var ref = firebase.database().ref('tracker/' + uuidVoter);
    if (tempTracker.position.length < 1) {
      tempTracker.position = newPosition;
      console.log('New Poition: ' + tempTracker.position);
      ref.set(tempTracker).finally( () => {
        this.router.navigate(['/splash-screen/vote']);
      });
    } else {
      tempTracker.position = tempTracker.position + ',' + newPosition;
      // console.log('Updating : ' + '. New Poition: ' + tempTracker.position);
      ref.update(tempTracker).finally(() => {
        this.router.navigate(['/splash-screen/vote']);
      });
    }
  }
}
