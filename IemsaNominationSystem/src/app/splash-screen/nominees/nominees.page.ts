import { NotificationHelperService } from './../Services/notification-helper.service';
import { LoginService } from './../Services/auth/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { NomineeService } from '../Services/nominee.service';
import { Nominee } from '../models/nominee';
import { Observable } from 'rxjs';
import { FirebaseAuth } from '@angular/fire';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { NominationCount } from '../models/nomination-count';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.page.html',
  styleUrls: ['./nominees.page.scss'],
})
export class NomineesPage implements OnInit {
  public nomineeList: Nominee[] = [];
  public nomineeListNominated: Nominee[] = [];
  public fileLocation = 'assets/user.png';
  public NominationCountObject: NominationCount;
  public confirmedNomineesList: Observable<any[]>;
  public nomineesNominated: string[] = [];
  constructor(
    private nomineeService: NomineeService,
    private router: Router,
    private notService: NotificationHelperService,
    private route: ActivatedRoute
    
    ) {
      if(firebase.auth().currentUser == null){
        this.router.navigate(['/splash-screen']);
      } 
      this.notService.presentLoading('Signing In Administrator...');
      this.route.paramMap.subscribe(
      () => {
        this.nomineeList = [];
      this.nomineeService.getNomineesNominated().then(
        (snapshot) => {
          if(snapshot.val() != null){
            this.nomineesNominated = snapshot.val().confirmedNominees;
          }
        }
      ).then(
        () => {
            // Scrutineer has already nominated for a user
            this.populateNomineeList().subscribe(
              (value) => {
                value.action.forEach(
                  tempNominee => {
                    if(this.nomineesNominated.length > 0){
                      // Nominated for someone
                      if (!this.nomineesNominated.includes(tempNominee.id)) {
                        if(this.nomineeList.filter(obj => obj.id === tempNominee.id).length < 1){
                          this.nomineeList.push(tempNominee);
                        }
                      }

                      if (this.nomineesNominated.includes(tempNominee.id)) {
                        if(this.nomineeListNominated.filter(obj => obj.id === tempNominee.id).length < 1){
                          this.nomineeListNominated.push(tempNominee);
                        }
                      }
                    }else {
                      // Not nominated
                      this.nomineeList.push(tempNominee);
                    }
                  }
                )
              }
            )
          }
      )
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
