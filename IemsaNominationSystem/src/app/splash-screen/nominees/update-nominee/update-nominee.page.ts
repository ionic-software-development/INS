import { NomineeService } from './../../Services/nominee.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-nominee',
  templateUrl: './update-nominee.page.html',
  styleUrls: ['./update-nominee.page.scss'],
})
export class UpdateNomineePage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private nomineeService: NomineeService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap =>{
        if(!paramMap.has('nomineeId')){
          // redirect
          // this.router.navigate(['/recipes']);
          console.log('Does not contain nominee id');
          return;
        }
        const nomineeId = paramMap.get('nomineeId');
        const feedback = this.nomineeService.getNominee(nomineeId);
        console.log(feedback);
      }
    );
  }

}
