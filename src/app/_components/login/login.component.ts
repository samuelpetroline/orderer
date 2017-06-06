import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../_services/Loading/loading.service';
import { AlertService } from '../../_services/alert/alert.service';
import { AuthenticationService } from '../../_services/authentication/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoadingService, AlertService, AuthenticationService]
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;

  constructor(
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loading.stop();

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/main'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
  }

  ngOnDestroy(){
    this.loading.start();
  }

  login() {
    this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    // remover comentários
                    //this.alertService.error(error._body);
                    //this.loading.stop();
                    this.router.navigate([this.returnUrl]);
                });
  }

}
