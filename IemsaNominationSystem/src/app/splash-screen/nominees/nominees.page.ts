import { Component, OnInit } from '@angular/core';
import { NomineeService } from '../Services/nominee.service';
import { Nominee } from '../models/nominee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.page.html',
  styleUrls: ['./nominees.page.scss'],
})
export class NomineesPage implements OnInit {
  nomineeList: Observable<any[]>;
  fileLocation = '/assets/female.png';

  constructor(
    nomineeService: NomineeService
  ) {
    this.nomineeList = nomineeService.getNomineeList().valueChanges();
    console.log('Printing list of nominees');
    console.log(this.nomineeList);
  }

  ngOnInit() {
  }

}
