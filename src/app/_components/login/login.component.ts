import { Component, OnInit, ViewChild } from '@angular/core';
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

    if (this.authenticationService.isAuthenticated) {
      this.router.navigate(['/main']);
      return;
    }

    // get return url from route parameters or default to '/main'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
  }

  login() {
    this.isLogging = true;

    this.authenticationService.login(this.user.name, this.user.password).subscribe(data => {
      if (data.sucess) {
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.alertService.error(data.message);
        this.isLogging = false;
      }
    }, error => {
      console.log('lado errado');
      console.log(error);
    });

    // .subscribe(
    //   data => {
    //     this.router.navigate([this.returnUrl]);
    //   },
    //   error => {
    //     this.alertService.error(error._body);
    //     this.isLogging = false;
    //   });
  }

}
