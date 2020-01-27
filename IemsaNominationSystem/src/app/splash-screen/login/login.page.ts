import { LoginService } from './../Services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scrutineer } from '../models/scrutineer.model';
import { ScrutineerServiceService } from '../Services/scrutineer-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HelperMethodsService } from '../Services/helper-methods.service';
import { NotificationHelperService } from '../Services/notification-helper.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public scrutineer: FormGroup;
  response: any;
  // Default Error Messages
  validationMessages = {
    email: [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      password: [
        { type: 'fail', message: 'Password is required' }
      ]
  };
  constructor(private scrutineerService: ScrutineerServiceService,
              private firebaseAuth: AngularFireAuth,
              private router: Router,
              private helperMethods: HelperMethodsService,
              private notificationHelper: NotificationHelperService,
              private loginService: LoginService,
              private formBuilder: FormBuilder) {
                this.scrutineer = this.formBuilder.group({
                  email: ['', helperMethods.isValidEmail],
                  password: ['', helperMethods.isValidPassword],
                });
              }

  ngOnInit() {
    // this.scrutineer = this.scrutineerService.getScrutineer();
  }

  login() {
    this.loginService.login(this.scrutineer);
    // this.loginService.login.(data => console.log(data));
    //console.log(this.response);
  }
}
