import { Router } from '@angular/router';
import { NotificationHelperService } from './notification-helper.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Scrutineer } from '../models/scrutineer.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ScrutineerServiceService {
  private dbPath = 'scrutineers';
  scrutineerRef: AngularFireList<Scrutineer> = null;

  private scrutineer: Scrutineer = {
    cellphoneNumber: 0,
    emailAddress: '',
    firstName: '',
    lastName: '',
    password: '',
    createdOn: new Date().toDateString(),
    userRole: 'scrutineer',
  };
  constructor(
    private firebaseAuth: AngularFireAuth,
    private notService: NotificationHelperService,
    private database: AngularFireDatabase,
    private router: Router
  ) {
    this.scrutineerRef = database.list(this.dbPath);

  }
  getScrutineer() {
    return this.scrutineer;
  }

  async registerScrutineer(scrutineer: Scrutineer) {
    await this.firebaseAuth.auth.createUserWithEmailAndPassword(scrutineer.emailAddress, scrutineer.password).
     then(
       () => {
         this.scrutineerRef.push(scrutineer);
       }
     ).then(
       () => {
         this.notService.presentToast('Successfully Registered A New Scrutineer');
         this.router.navigate(['/splash-screen/nominees']);
       }
     ).catch(
       error => {
         this.notService.presentToast(error.message);
       }
     );
   }

}
