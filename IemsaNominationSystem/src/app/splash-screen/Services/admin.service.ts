import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationHelperService } from './notification-helper.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Administrator } from './../models/administrator.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admin: Administrator = {
    firstName: '',
    createdOn: new Date().toDateString(),
    emailAddress: '',
    lastName: '',
    password: '',
    userRole: 'admin'
  };
  private dbPath = 'admin';
  adminRef: AngularFireList<Administrator> = null;

  constructor(
    private database: AngularFireDatabase,
    private notService: NotificationHelperService,
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    this.adminRef = database.list(this.dbPath);
  }

  initializeAdministrator() {
    return this.admin;
  }
  async createAdmin(admin: Administrator) {
   await this.firebaseAuth.auth.createUserWithEmailAndPassword(admin.emailAddress, admin.password).
    then(
      () => {
        this.adminRef.push(admin);
      }
    ).then(
      () => {
        this.notService.presentToast('Successfully Registered New Administrator');
        this.router.navigate(['/splash-screen/nominees']);
      }
    ).catch(
      error => {
        this.notService.presentToast(error.message);
      }
    );
  }

  // Get a list of nominees
  getAdminList(): AngularFireList<Administrator> {
    return this.adminRef;
  }
}
