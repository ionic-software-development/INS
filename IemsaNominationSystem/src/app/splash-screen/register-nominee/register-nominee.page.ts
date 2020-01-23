import { Component, OnInit } from '@angular/core';
import { Scrutineer } from '../models/scrutineer.model';
import { ScrutineerServiceService } from '../Services/scrutineer-service.service';
import { NomineeService } from '../Services/nominee.service';
import { Nominee } from '../models/nominee';

@Component({
  selector: 'app-register-nominee',
  templateUrl: './register-nominee.page.html',
  styleUrls: ['./register-nominee.page.scss'],
})
export class RegisterNomineePage implements OnInit {
  nominee: Nominee;
  constructor(private nomineeService: NomineeService) {
    this.nominee = nomineeService.initializeNominee();
  }

  ngOnInit() {
  }

  registerNominee() {
    console.log("Registering a new nominee");
    this.nomineeService.createNominee(this.nominee)
  }
  
}
