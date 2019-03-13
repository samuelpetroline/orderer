import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert/alert.service';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  providers: [AlertService]
})
export class AlertComponent implements OnInit {
  message: any = {};

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getMessage().subscribe(message => { this.message = message; });
  }

}
