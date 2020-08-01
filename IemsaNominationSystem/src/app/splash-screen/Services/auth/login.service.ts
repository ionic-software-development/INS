import { ScrutineerServiceService } from './../scrutineer-service.service';
import { FormGroup } from '@angular/forms';
import { NotificationHelperService } from './../notification-helper.service';
import { Scrutineer } from './../../models/scrutineer.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { FirebaseAuth } from '@angular/fire';
import * as firebase from 'firebase/app';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  response: any = null;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notService: NotificationHelperService,
    private scrutineerService: ScrutineerServiceService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        if(ev.url === '/splash-screen/logout') {
          this.logoutUser();
        }
        /* Your code goes here on every router change */}
    });
  }

  async login(scrutineer: FormGroup) {
    await this.firebaseAuth.auth.signInWithEmailAndPassword(scrutineer.value.email.trim(), scrutineer.value.password).
    then(
      value => {
         this.response = this.scrutineerService.searchForUser(value.user.uid);
      }
    )
    .catch(
      error => {
        var errorMessage = error.message;
          this.notService.presentToast(error.message);

      });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          this.router.navigate(['/splash-screen']);
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }

  
}
