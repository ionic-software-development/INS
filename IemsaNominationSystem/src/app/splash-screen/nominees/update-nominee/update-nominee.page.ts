import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Nominee } from './../../models/nominee';
import { NomineeService } from './../../Services/nominee.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-update-nominee',
  templateUrl: './update-nominee.page.html',
  styleUrls: ['./update-nominee.page.scss'],
})
export class UpdateNomineePage implements OnInit {
  nominee: AngularFireObject<any>;
  newNom: Nominee;
  public newNomCount = 0;
  public updatedNominee: FormGroup = null;
  private nomineeId: string;
  private nomineeToUpdate: Nominee = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private nomineeService: NomineeService,
    private formBuilder: FormBuilder
  ) {

    // Initialize formGroup
    this.updatedNominee = this.formBuilder.group({
      nominationCount: ['', Validators.required]
    });
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('nomineeId')){
          // redirect
          // this.router.navigate(['/recipes']);
          console.log('Does not contain nominee id');
          return;
        }
        // Initialize an empty nominee
        // Without this line, code returns that newNom is null
        this.newNom = nomineeService.initializeNominee();
        // Get the nomination ID of the nominee from the router
        this.nomineeId = paramMap.get('nomineeId');
        // Use the nomination ID to find the nominee in the database
        this.nominee = this.nomineeService.getNominee(this.nomineeId);

        this.nominee.snapshotChanges().subscribe(action => {
          // console.log(action.type);
          // console.log(action.key);
          this.newNom = Object.assign(this.newNom, action.payload.val());
        });
        // console.log(feedback);
      }
    );
  }
  ngOnInit() {
  }

  confirmNomination() {
    // this.nomineeToUpdate = Object.assign(this.nomineeToUpdate, this.newNom.value);
    // console.log('Updated nominee count is' + this.newNomCount);
    this.nomineeService.updateNomineeCount(this.nomineeId, this.newNom, this.newNomCount.toString());
  }
}
