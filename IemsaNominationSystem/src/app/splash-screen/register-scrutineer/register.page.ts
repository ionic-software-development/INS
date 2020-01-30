import { Component, OnInit } from '@angular/core';
import { Scrutineer } from '../models/scrutineer.model';
import { ScrutineerServiceService } from '../Services/scrutineer-service.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  scrutineer: Scrutineer;
  constructor(private scrutineerService: ScrutineerServiceService,
              private firebaseAuth: AngularFireAuth,
              private router: Router) { }

  ngOnInit() {
    this.scrutineer = this.scrutineerService.getScrutineer();
  }

  register() {
    this.scrutineerService.registerScrutineer(this.scrutineer);
  }
}
