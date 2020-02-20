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
         this.router.navigate(['/splash-screen/nominees']);
       }
     ).catch(
       error => {
         this.notService.presentToast(error.message);
       }
     );
   }
  // This method takes a unique email address of a user and will determine whether a user is a scrutineer
  searchForNominee(uid: string) {
    this.itemRef = this.database.object('scrutineers/' + uid);
    let temp = null;
    this.itemRef.snapshotChanges().subscribe(action => {
      temp = action.payload.val();
      if(temp.userRole === 'scrutineer') {
        // Check the type of user. Redirect to relevant 'screen'
        this.notService.presentLoading('Signing In Scrutineer...').finally(
          () => {
            this.router.navigate(['/splash-screen/scrutineer/scrutineer-home']);
          }
        );
      } else {
        // Sign user into the administrator screen
        this.notService.presentLoading('Signing In Administrator...').finally(
          () => {
            this.router.navigate(['/splash-screen/nominees']);
          }
        );
      }
      // return action.payload.val();
    });
    //return temp;
  }
}
