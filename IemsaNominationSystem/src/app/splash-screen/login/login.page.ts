import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scrutineer } from '../models/scrutineer.model';
import { ScrutineerServiceService } from '../Services/scrutineer-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  scrutineer: Scrutineer;
  constructor(private scrutineerService: ScrutineerServiceService,
              private firebaseAuth: AngularFireAuth,
              private router: Router) { }

  ngOnInit() {
    this.scrutineer = this.scrutineerService.getScrutineer();
  }

  async login() {
    console.log(this.scrutineer.firstName);
    try {
      const res = await this.firebaseAuth.auth.signInWithEmailAndPassword(this.scrutineer.emailAddress, this.scrutineer.password);
      console.log('Logging in');
      this.router.navigate(['/splash-screen/nominees']);
      console.log(res);
    } catch (error) {
      console.dir(error);
    }
    }
}
