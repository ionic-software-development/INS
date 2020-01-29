import { NotificationHelperService } from './notification-helper.service';
import { Injectable } from '@angular/core';
import { Nominee } from '../models/nominee';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Router } from '@angular/router';

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
    gender: ''
  };
  private dbPath = 'nominees';
  nomineesRef: AngularFireList<Nominee> = null;
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
      () => {
        this.notService.presentToast('Successfully Registered New Nominee');
        this.router.navigate(['/splash-screen/nominees']);
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
  // Delete a nominee
}
