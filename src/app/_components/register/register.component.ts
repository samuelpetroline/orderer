import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertComponent } from '../../_directives/alert/alert.component';
import { LoadingService } from '../../_services/Loading/loading.service';
import { AlertService } from '../../_services/alert/alert.service';
import { AuthenticationService } from '../../_services/authentication/authentication.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AlertService, LoadingService, AuthenticationService]
})
export class RegisterComponent implements OnInit {

  step: number;
  model: any = {};
  registerBillingInfo = false;

  constructor(
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loading.stop();    
    this.step = 1;
    this.model.payment = 1;
  }

  previous() {

    if (this.step != 1) {
      this.step--;
    } else {
      this.router.navigate(['/login']);
    }

  }

  next() {

   if (this.step != 3) {
      this.step++;
    }
    else {
      this.register();
    }

  }

  register() {
    this.alertService.success("Parabéns, tudo certo !");
    this.router.navigate(['/login']);
  }

}
