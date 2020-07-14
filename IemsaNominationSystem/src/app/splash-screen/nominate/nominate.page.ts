import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nominate',
  templateUrl: './nominate.page.html',
  styleUrls: ['./nominate.page.scss'],
})
export class NominatePage implements OnInit {

  constructor(
    private router: Router,
  ) {
    if(firebase.auth().currentUser == null){
      this.router.navigate(['/splash-screen']);
    }
   }

  ngOnInit() {
    if(firebase.auth().currentUser == null){
      this.router.navigate(['/splash-screen']);
    }
  }

}
