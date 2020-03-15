import { AdminService } from '../../Services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Administrator } from '../../models/administrator.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.page.html',
  styleUrls: ['./register-admin.page.scss'],
})
export class RegisterAdminPage implements OnInit {
  public administrator: FormGroup = null;
  public adminToUpdate: Administrator;

  constructor(
      private adminService: AdminService,
      private formBuilder: FormBuilder
  ) {
    this.administrator = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      emailAddress: ['', Validators.email]
    });
    this.adminToUpdate = adminService.initializeAdministrator();
  }
  ngOnInit() {
  }

  registerAdmin() {
    this.adminToUpdate = Object.assign(this.adminToUpdate, this.administrator.value);
    this.adminService.createAdmin(this.adminToUpdate);

  }
}
