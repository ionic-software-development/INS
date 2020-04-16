import { Injectable } from '@angular/core';
import { Vote } from '../models/vote.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { NotificationHelperService } from './notification-helper.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  voteRef: AngularFireList<Vote> = null;
  private dbPath = 'votes';
  private voteObject: Vote = {
    nominee_uid: '',
    voted_date: new Date().toDateString(),
    voter_uuid: 'scrutineer',
  };
  constructor(
    public database: AngularFireDatabase,
    public notService: NotificationHelperService,
  ) {
    //voteObject = this.initializeVote();
    this.voteRef = database.list(this.dbPath);

  }

  vote(uuidVoter: string, uuidRecipient: string) {
    this.voteObject.voter_uuid = uuidVoter;
    this.voteObject.nominee_uid = uuidRecipient;
    this.voteRef.push(this.voteObject).then(
      (key) => {
        this.voteRef.update(this.voteObject.voter_uuid, this.voteObject);
        // this.notService.presentToast('Successfully Registered New Nominee');
        // this.router.navigate(['/splash-screen/nominees']);
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
}
