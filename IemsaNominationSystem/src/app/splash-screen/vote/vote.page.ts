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
  public nomineeListVoted: Nominee[] = [];
  private positionsVoted: string[] = [];
  fileLocation = 'assets/user.png';
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
          }
        ).finally(
          () => {
            this.populateNomineeList().subscribe(
              value => {
                value.action.forEach(
                  tempMember => {
                    if(this.positionsVoted.length > 0){
                      if (tempMember.is_eligible_to_vote.toString() === 'true' && !this.positionsVoted.includes(tempMember.position)) {
                        if(this.nomineeList.filter(obj => obj.id === tempMember.id).length < 1){
                          this.nomineeList.push(tempMember);
                        }
                      }
                      if (tempMember.is_eligible_to_vote.toString() === 'true' && this.positionsVoted.includes(tempMember.position)) {
                        if(this.nomineeListVoted.filter(obj => obj.id === tempMember.id).length < 1){
                          this.nomineeListVoted.push(tempMember);
                        }
                      }
                    }
                    else {
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
