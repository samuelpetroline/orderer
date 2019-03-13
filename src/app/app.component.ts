import { Component } from '@angular/core';
import { LoadingService } from './_services/loading/loading.service';
import { AuthenticationService } from './_services/authentication/authentication.service';
import { AlertService } from './_services/alert/alert.service';
import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoadingService, AuthenticationService, AlertService]
})
export class AppComponent {}
