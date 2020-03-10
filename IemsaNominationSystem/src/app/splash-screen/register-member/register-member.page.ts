import { MemberService } from './../Services/member.service';
import { Member } from './../models/member.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.page.html',
  styleUrls: ['./register-member.page.scss'],
})
export class RegisterMemberPage implements OnInit {
  public member: FormGroup = null;
  public memberToUpdate: Member;
  constructor(
    private memberService: MemberService,
    private formBuilder: FormBuilder
  ) {
    this.member = this.formBuilder.group({
      member_first_name: ['', Validators.required],
      member_last_name: ['', Validators.required],
      member_password: ['', Validators.required],
      member_email_address: ['', Validators.email]
    });
    this.memberToUpdate = memberService.initializeMember();
   }

  ngOnInit() {
  }

  registerMember() {
    this.memberToUpdate = Object.assign(this.memberToUpdate, this.member.value);
    console.log(this.memberToUpdate);
    this.memberService.createMember(this.memberToUpdate);

  }
}
