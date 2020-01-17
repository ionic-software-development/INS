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
  private firstName  = '';
  private lastName = '';
  private cellphoneNumber = 0;
  private emailAddress = '';
  constructor() { }
  getScrutineer(){
    return this.scrutineer;
  }

}
