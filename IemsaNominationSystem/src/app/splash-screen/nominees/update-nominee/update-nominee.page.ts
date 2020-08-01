import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Nominee } from './../../models/nominee';
import { NomineeService } from './../../Services/nominee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { NotificationHelperService } from '../../Services/notification-helper.service';

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
    private router: Router,
    private nomineeService: NomineeService,
    private formBuilder: FormBuilder,
    private notService: NotificationHelperService
  ) {
    if(firebase.auth().currentUser == null){
      this.router.navigate(['/splash-screen']);
    } else {
      // Initialize formGroup
    this.updatedNominee = this.formBuilder.group({
      nominationCount: ['', Validators.required]
    });
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('nomineeId')){
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
          this.newNom = Object.assign(this.newNom, action.payload.val());
        });
      }
    );
    }
    
  }
  ngOnInit() {
  }

  confirmNomination() {
    this.notService.presentLoadingForNomination();
    this.nomineeService.updateNomineeCount(this.nomineeId, this.newNom, this.newNomCount.toString());
  }
}
