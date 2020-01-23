import { Injectable } from '@angular/core';
import { Nominee } from '../models/nominee';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NomineeService {
  private nominee: Nominee = {
    nominationCount: 0,
    firstName: '',
    lastName: '',
    position: ''
  };
  private dbPath = 'nominees';
  nomineesRef: AngularFireList<Nominee> = null;
  constructor(
    private database: AngularFireDatabase
  ) {
    this.nomineesRef = database.list(this.dbPath);
  }
  // Get an empty object of nominees
  initializeNominee() {
    console.log(this.nominee);
    return this.nominee;
  }
  // Get a list of nominees
  getNomineeList(): AngularFireList<Nominee> {
    return this.nomineesRef;
  }
  // Create a new nominee
  createNominee(nominee: Nominee) {
    this.nomineesRef.push(nominee);
  }
  // Update the value of a nominee
  updateNominee(key: string, nominee: Nominee) {
    this.nomineesRef.update(key, nominee);
  }
  // Delete a nominee
}
