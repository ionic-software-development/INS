import { map } from 'rxjs/operators';
import { Scrutineer } from './../models/scrutineer.model';
import { Router } from '@angular/router';
import { NotificationHelperService } from './notification-helper.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, NgModule } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrutineerServiceService {
  private dbPath = 'scrutineers';
  scrutineerRef: AngularFireList<Scrutineer> = null;
  public myEventList: Observable<any>;
  item: Observable<any>;
  itemRef: AngularFireObject<any>;
  adminsRef: AngularFireObject<any>;
  private searchedScrutineer: Scrutineer = null;
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
    private router: Router,
  ) {
    this.scrutineerRef = database.list(this.dbPath);
  }
  getScrutineer() {
    return this.scrutineer;
  }

  async registerScrutineer(scrutineer: Scrutineer) {
    await this.firebaseAuth.auth.createUserWithEmailAndPassword(scrutineer.emailAddress, scrutineer.password).
     then(
       (returned) => {
         this.scrutineerRef.set(returned.user.uid, scrutineer);
       }
     ).then(
       () => {
         this.notService.presentToast('Successfully Registered A New Scrutineer');
         this.router.navigate(['/splash-screen/scrutineer-home']);
       }
     ).catch(
       error => {
         this.notService.presentToast(error.message);
       }
     );
   }
  // This method takes a unique email address of a user and will determine whether a user is a scrutineer
  searchForUser(uid: string) {
    this.itemRef = this.database.object('scrutineers/' + uid);
    this.adminsRef = this.database.object('admins/' + uid);

    this.itemRef.snapshotChanges().subscribe(action => {
      let temp = action.payload.val();
      console.log('payload is ' + temp);
      if (temp) {
        //user is an scrutineer
        if (temp.userRole === 'scrutineer') {
          // Check the type of user. Redirect to relevant 'screen'
          this.navigateToScrutineer();
        }
      }
    });

    this.adminsRef.snapshotChanges().subscribe(action => {
      let temp = action.payload.val();
      console.log('payload for admin is ' + action.payload.val());
      if (temp) {
        // user is an scrutineer
        if (temp.userRole === 'admin') {
          // Check the type of user. Redirect to relevant 'screen'
          this.navigateToAdmin();
        }
      }
    });
  }

  navigateToScrutineer(){
    // 'splash-screen/scrutineer/scrutineer-home'
    this.router.navigate(['/splash-screen/scrutineer-home/']);
  }

  navigateToAdmin(){
    this.router.navigate(['/splash-screen/nominees']);
  }
}
