import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  public imageLocation = 'assets/full-logo.jpg';
  constructor() { }

  ngOnInit() {
  }

}
