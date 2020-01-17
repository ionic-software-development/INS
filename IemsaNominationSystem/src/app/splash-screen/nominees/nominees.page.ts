import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.page.html',
  styleUrls: ['./nominees.page.scss'],
})
export class NomineesPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor() { }

  ngOnInit() {
  }

}
