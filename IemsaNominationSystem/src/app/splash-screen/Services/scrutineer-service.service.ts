import { Injectable } from '@angular/core';
import { Scrutineer } from '../models/scrutineer.model';

@Injectable({
  providedIn: 'root'
})
export class ScrutineerServiceService {

  private scrutineer: Scrutineer = {
    cellphoneNumber: 0,
    emailAddress: '',
    firstName: '',
    lastName: '',
    password: '',
    createdOn: new Date().toDateString(),
    userRole: 'scrutineer',
  };

  constructor() { }
  getScrutineer(){
    return this.scrutineer;
  }

}
