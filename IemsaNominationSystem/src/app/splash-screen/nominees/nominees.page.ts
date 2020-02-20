import { NotificationHelperService } from './../Services/notification-helper.service';
import { LoginService } from './../Services/auth/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { NomineeService } from '../Services/nominee.service';
import { Nominee } from '../models/nominee';
import { Observable } from 'rxjs';
import { FirebaseAuth } from '@angular/fire';

@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.page.html',
  styleUrls: ['./nominees.page.scss'],
})
export class NomineesPage implements OnInit {
  nomineeList: Observable<any[]>;
  fileLocation = '/assets/female.png';

  constructor(
    private nomineeService: NomineeService,
    private loginService: LoginService,
    private notService: NotificationHelperService,
  ) {
    this.nomineeList = nomineeService.getNomineeList().valueChanges();
  }
  ngOnInit() {
    this.notService.presentLoading('Signing In Administrator...');
  }

  logOut() {
    this.loginService.logoutUser();
  }
}
