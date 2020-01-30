import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperMethodsService {

  constructor() { }

  public isValidEmail(formControl: FormControl) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(formControl.value);
    if (!result) {
      return {
        'email:validation:fail' : true
      };
    }
    return false;
  }

  public isValidPassword(formControl: FormControl) {
    if(formControl.value.length < 5) {
      // length of supplied input less than 5
      if(!formControl.valid){
        console.log(formControl.errors);
      }
      return {
        'password:validation:fail' : true
      }
    }
    return true;
  }
  // To Do:
  // input: Destination email address, subject
  // return: boolean true/false on success/failure of request to send email
  public sendEmail() {
  }
}
