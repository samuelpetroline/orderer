import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/Alert/alert.service';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;

  constructor() { }

  ngOnInit() {
  }

}
