import { FormGroup } from '@angular/forms';
import { NotificationHelperService } from './../notification-helper.service';
import { Scrutineer } from './../../models/scrutineer.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private notService: NotificationHelperService,
    
  ) { }

  async login(scrutineer: FormGroup) {
    await this.firebaseAuth.auth.signInWithEmailAndPassword(scrutineer.value.email.trim(), scrutineer.value.password).
    then(
      value => {
        this.notService.presentLoading('Signing In...').finally(
          () => {
            this.router.navigate(['/splash-screen/nominees']);
          }
        );
      }
    )
    .catch(
      error => {
        var errorMessage = error.message;
        if (error.code === 'auth/invalid-email') {
          this.notService.presentToast(error.message);
        } else {
          console.log(errorMessage);
        }
      });
  }
}
