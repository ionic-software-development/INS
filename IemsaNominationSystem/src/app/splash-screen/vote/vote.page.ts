import { Vote } from './../models/vote.model';
import { map } from 'rxjs/operators';
import { Nominee } from './../models/nominee';
import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { NomineeService } from '../Services/nominee.service';
import { VoteService } from '../Services/vote.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.page.html',
  styleUrls: ['./vote.page.scss'],
})
export class VotePage implements OnInit {

  public nomineeList: Nominee[] = [];
  private positionsVoted: string[] = [];
  constructor(
    private nomineeService: NomineeService,
    private voteService: VoteService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(
      () => {
        this.positionsVoted = [];
        this.nomineeList = [];
        voteService.getPositionsVoted().then(
          (snapshot) => {
            this.positionsVoted = snapshot.val().position;
            // console.log(snapshot.val().position);
          }
        ).finally(
          () => {
            console.log(this.positionsVoted);
            this.populateNomineeList().subscribe(
              value => {
                value.action.forEach(
                  tempMember => {
                    if (tempMember.is_eligible_to_vote.toString() === 'true' && !this.positionsVoted.includes(tempMember.position)) {
                      this.nomineeList.push(tempMember);
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
    
   }

  ngOnInit() {
  }

  populateNomineeList() {
    return this.nomineeService.getNomineeList().valueChanges().pipe(
      map(action => {
        return { action };
      })
    );
  }
}
