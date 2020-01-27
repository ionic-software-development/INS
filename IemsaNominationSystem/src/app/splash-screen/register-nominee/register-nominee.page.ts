import { Nominee } from './../models/nominee';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Scrutineer } from '../models/scrutineer.model';
import { ScrutineerServiceService } from '../Services/scrutineer-service.service';
import { NomineeService } from '../Services/nominee.service';

@Component({
  selector: 'app-register-nominee',
  templateUrl: './register-nominee.page.html',
  styleUrls: ['./register-nominee.page.scss'],
})
export class RegisterNomineePage implements OnInit {
  public nominee: FormGroup = null;
  public nomineeToUpdate: Nominee;
  constructor(
    private nomineeService: NomineeService,
    private formBuilder: FormBuilder) {
    this.nominee = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      position: ['', Validators.required],
      nominationCount: ['', Validators.required]
    });
    this.nomineeToUpdate = nomineeService.initializeNominee();
  }

  ngOnInit() {
  }

  registerNominee() {
    console.log(this.nominee.value);
    this.nomineeToUpdate = Object.assign(this.nomineeToUpdate, this.nominee.value);
    console.log(this.nomineeToUpdate);
    this.nomineeService.createNominee(this.nomineeToUpdate);
  }
}
