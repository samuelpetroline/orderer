import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../_services/Loading/loading.service';
import { AlertService } from '../../_services/Alert/alert.service';
import { AuthenticationService } from '../../_services/Authentication/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('login') loginButton;

  private isLogging: boolean = false;
  model: any = {};
  returnUrl: string;

  constructor(
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/main'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
  }

  login() {
    this.isLogging = true;

    console.log(this.loginButton);

    this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error._body);        
                    this.isLogging = false;            
                });
  }

}
