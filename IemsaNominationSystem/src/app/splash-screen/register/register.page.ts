import { Component, OnInit } from '@angular/core';
import { Scrutineer } from '../models/scrutineer.model';
import { ScrutineerServiceService } from '../Services/scrutineer-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  scrutineer: Scrutineer;
  constructor(private scrutineerService:ScrutineerServiceService,
              private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.scrutineer = this.scrutineerService.getScrutineer();
  }

  async register() {
    console.log(this.scrutineer.firstName);
    try{
      const res = await this.firebaseAuth.auth.createUserWithEmailAndPassword(this.scrutineer.emailAddress, this.scrutineer.password);
      console.log(res);
    } catch (error) {
      console.dir(error);
    }
    }
}
