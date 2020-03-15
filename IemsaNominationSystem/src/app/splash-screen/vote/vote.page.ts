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
            console.log('temp member is  ' + tempMember.is_eligible_to_vote);
            if (tempMember.is_eligible_to_vote.toString() === 'true') {
              this.nomineeList.push(tempMember);
              console.log('member ' + this.nomineeList);
            }
          }
        );
      }
    );

    // this.populateNomineeList().subscribe(
    //   returned => {
    //     returned.forEach(
    //       member_from_db => {
    //         if(member_from_db.is_eligible_to_vote === 'true'){
    //           this.nomineeList.push(member_from_db);
    //           console.log('member_from_db is: ' + member_from_db);
    //         }
    //       }
    //     );
    //   }
    // );;
  }

  populateNomineeList(){
    return this.nomineeService.getNomineeList().valueChanges().pipe(
      map(action => {
        return { action };
      })
    );
  }
}
