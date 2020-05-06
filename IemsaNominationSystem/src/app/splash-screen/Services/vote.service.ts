import { Injectable } from '@angular/core';
import { Vote } from '../models/vote.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { NotificationHelperService } from './notification-helper.service';
import { Tracker } from '../models/tracker.model';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private voteRef: AngularFireList<Vote> = null;
  private trackerRef: AngularFireList<Tracker> = null;
  private dbPath = 'votes';
  private trackerDBPath = 'tracker';
  private position = '';
  private voteObject: Vote = {
    nominee_uid: '',
    voted_date: new Date().toDateString(),
    voter_uuid: 'scrutineer',
  };
  private trackerOb: Tracker = {
    position: '',
    votedMembersUid: ''
  };
  constructor(
    public database: AngularFireDatabase,
    public notService: NotificationHelperService,
  ) {
    //voteObject = this.initializeVote();
    this.voteRef = database.list(this.dbPath);
    this.trackerRef = database.list(this.trackerDBPath);
  }

  vote(uuidMember: string, uuidRecipient: string, Nomineeposition: string) {
    this.voteObject.voter_uuid = uuidMember;
    this.voteObject.nominee_uid = uuidRecipient;
    this.voteRef.push(this.voteObject).then(
      (key) => {
        this.voteRef.update(this.voteObject.voter_uuid, this.voteObject);
        // this.notService.presentToast('Successfully Registered New Nominee');
        // this.router.navigate(['/splash-screen/nominees']);
      }
    ).then(
      () => {
         // Update the tracker object
         this.trackerOb.position = Nomineeposition;
         this.trackerOb.votedMembersUid = uuidMember;
         this.trackerRef.push(this.trackerOb);
      }
    ).catch(
      error => {
        this.notService.presentToast(error.message);
      }
    );
  }

  initializeVote() {
    return  this.voteObject;
  }

  // This method updates the members who have voted for a position
  // Given a members' uid as input, search for whether their name appears
}
