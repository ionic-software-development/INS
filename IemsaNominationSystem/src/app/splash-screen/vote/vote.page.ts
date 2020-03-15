import { Vote } from './../models/vote.model';
import { map } from 'rxjs/operators';
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

  nomineeList: Nominee[] = [];

  constructor(
    private nomineeService: NomineeService,
  ) {
   }

  ngOnInit() {
    this.populateNomineeList().subscribe(
      value => {
        value.action.forEach(
          tempMember => {
            if (tempMember.is_eligible_to_vote.toString() === 'true') {
              this.nomineeList.push(tempMember);
            }
          }
        );
      }
    );
  }

  populateNomineeList() {
    return this.nomineeService.getNomineeList().valueChanges().pipe(
      map(action => {
        return { action };
      })
    );
  }
}
