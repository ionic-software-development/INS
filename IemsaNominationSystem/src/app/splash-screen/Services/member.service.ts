import { Member } from './../models/member.model';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { NotificationHelperService } from './notification-helper.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private member: Member = {
    member_first_name: '',
    member_uid: '',
    member_created_date: new Date().toDateString(),
    member_email_address: '',
    member_last_name: '',
    member_password: '',
  };

  private dbPath = 'members';
  memberRef: AngularFireList<Member> = null;
  constructor(
    private database: AngularFireDatabase,
    private notService: NotificationHelperService,
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    this.memberRef = database.list(this.dbPath);
  }

  initializeMember() {
    return this.member;
  }

  async createMember(member: Member) {
    await this.firebaseAuth.auth.createUserWithEmailAndPassword(member.member_email_address, member.member_password).
     then(
       (returned) => {
         this.memberRef.set(returned.user.uid, member);
       }
     ).then(
       () => {
         this.notService.presentToast('Successfully Registered New Member');
         this.router.navigate(['/splash-screen/vote']);
       }
     ).catch(
       error => {
         this.notService.presentToast(error.message);
       }
     );
   }
}
