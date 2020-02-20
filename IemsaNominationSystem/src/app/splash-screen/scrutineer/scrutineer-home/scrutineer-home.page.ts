import { NotificationHelperService } from './../../Services/notification-helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrutineer-home',
  templateUrl: './scrutineer-home.page.html',
  styleUrls: ['./scrutineer-home.page.scss'],
})
export class ScrutineerHomePage implements OnInit {
  constructor(
    private notService: NotificationHelperService
  ) { }

  ngOnInit() {
    this.notService.presentLoading('Signing In Scrutineer...');
  }

}
