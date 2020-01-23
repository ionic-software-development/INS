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
    password: ''
  };

  constructor() { }
  getScrutineer(){
    return this.scrutineer;
  }

}
