import { Nominee } from './../models/nominee';
import { Platform } from '@ionic/angular';
import { NotificationHelperService } from './notification-helper.service';
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges, AngularFireAction, AngularFireObject} from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { NominationCount } from '../models/nomination-count';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class NomineeService {
  private nominee: Nominee = {
    id: null,
    nominationCount: null,
    createdOn: new Date().toDateString(),
    firstName: '',
    lastName: '',
    position: '',
    gender: '',
    is_eligible_to_vote: 'false',
    vote_count: 0
  };
  private dbPath = 'nominees';
  public ConfirmedNominationsCountPath = 'confirmedNominations/';
  nomineesRef: AngularFireList<Nominee> = null;
  public ConfirmedNominees: NominationCount = new NominationCount();
  // For retrieving a single element from firebase
  // https://github.com/angular/angularfire/blob/master/docs/rtdb/querying-lists.md
  nominees: AngularFireObject<any>;

  constructor(
    private database: AngularFireDatabase,
    private notService: NotificationHelperService,
    private router: Router
  ) {
    this.nomineesRef = database.list(this.dbPath);
  }
  // Get an empty object of nominees
  initializeNominee() {
    return this.nominee;
  }
  // Get a list of nominees
  getNomineeList(): AngularFireList<Nominee> {
    return this.nomineesRef;
  }
  // Create a new nominee
  createNominee(nominee: Nominee) {
    this.nomineesRef.push(nominee).then(
      (key) => {
        nominee.id = key.key.toString();
        this.nomineesRef.update(nominee.id, nominee);
        // this.notService.presentToast('Successfully Registered New Nominee');
        // this.router.navigate(['/splash-screen/nominees']);
      }
    ).catch(
      error => {
        this.notService.presentToast(error.message);
      }
    );
  }
  // Update the value of a nominee
  updateNominee(key: string, nominee: Nominee) {
    this.nomineesRef.update(key, nominee);
  }
  // Get a nominee by supplying id
  getNominee(id: string) {
    this.nominees = this.database.object(`nominees/` + id);
    // Use snapshotChanges().map() to store the key
    return this.nominees;
  }

  getConfirmedNominees(scrutineerId: string, nomineeId: string){
    var ref = firebase.database().ref('nominationTracker/' + scrutineerId);
    let key = null;
    var tempNominationCount: NominationCount = {
      confirmedNominees: '',
    };
    ref.once('value', (snapshot) => {
      key = snapshot.key;
      if(snapshot.val() != null) {
        // We now have our nominations
        tempNominationCount.confirmedNominees = snapshot.val().confirmedNominees;
      }
      this.updateNominations(tempNominationCount, nomineeId)
    });
  }

  updateNominations(nominationsCount: NominationCount, nomineeId: string) {
    let scrutineerId = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('nominationTracker/' + scrutineerId);
    if (nominationsCount.confirmedNominees.length < 1) {
      nominationsCount.confirmedNominees = nomineeId;
      ref.set(nominationsCount).finally( () => {
        this.router.navigate(['/splash-screen/nominees']);
      });
    } 
    else {
      nominationsCount.confirmedNominees = nominationsCount.confirmedNominees + ',' + nomineeId;
      ref.update(nominationsCount).then(
        () => {
          this.notService.presentLoadingForNomination()
        }
      ).finally(() => {
        this.router.navigate(['/splash-screen/nominees']);
      });
    }
  }
  updateNomineeCount(nomineeKey: string, nominee: Nominee, nominationCount: string) {
    const newNominationCount = parseInt(nominationCount, 10) + nominee.nominationCount;
    let scrutineerId = firebase.auth().currentUser.uid;
    this.getConfirmedNominees(scrutineerId, nomineeKey);
    nominee.nominationCount = newNominationCount;
    this.nomineesRef.update(nomineeKey, nominee);
  }

  getScrutineerId() {
    return firebase.auth().currentUser.uid.toString();
  }

  getNomineesNominated(): Promise<any> {
    let scrutineerId = firebase.auth().currentUser.uid.toString();
    let dummyArray: string[] = [];
    var ref = firebase.database().ref('nominationTracker/' + scrutineerId);
    if(typeof ref.once('value') === 'undefined'){
      return new Promise((value) => {});
    }
    return ref.once('value');
  }
}
