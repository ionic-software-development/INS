import { Nominee } from './../models/nominee';
import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { NomineeService } from '../Services/nominee.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.page.html',
  styleUrls: ['./vote.page.scss'],
})
export class VotePage implements OnInit {

  nomineeList: Nominee[] = null;

  constructor(
    private nomineeService: NomineeService,
  ) {
    nomineeService.getNomineeList().valueChanges()
    .subscribe(
      returned => {
        returned.forEach(
          member_from_db => {
            if(member_from_db.is_eligible_to_vote === 'true'){
              this.nomineeList.push(member_from_db);
              console.log('member_from_db');
            }
          }
        );
      }
    );

   }

  ngOnInit() {
  }


}
