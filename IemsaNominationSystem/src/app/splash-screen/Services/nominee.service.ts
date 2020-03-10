import { Nominee } from './../models/nominee';
import { Platform } from '@ionic/angular';
import { NotificationHelperService } from './notification-helper.service';
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges, AngularFireAction, AngularFireObject} from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


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
  nomineesRef: AngularFireList<Nominee> = null;

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

  updateNomineeCount(nomineeKey: string, nominee: Nominee, nominationCount: string) {
    const newNominationCount = parseInt(nominationCount, 10) + nominee.nominationCount;
    nominee.nominationCount = newNominationCount;
    this.nomineesRef.update(nomineeKey, nominee);
  }
}
