import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../_services/loading/loading.service';
import { AlertService } from '../../_services/alert/alert.service';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { User } from 'app/_models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;
  private isLogging = false;

  private returnUrl: string;

  constructor(
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.user = new User();

    this.authenticationService.isAuthenticated.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['../main']);
      }
    });

    // get return url from route parameters or default to '/main'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../main';
  }

  login() {
    this.isLogging = true;

    this.authenticationService.login(this.user.email, this.user.password).then(data => {
      if (data.sucess) {
        this.router.navigate([this.returnUrl]);
      }
    }, error => {
      this.alertService.error(error.message);
      this.isLogging = false;
    });
  }

}
