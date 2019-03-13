import { OnInit } from '@angular/core';

import { AlertService } from 'app/_services/alert/alert.service';

export class BaseComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
