import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

import { UserService } from '../User/user.service';
import { AppConfig } from '../../app.config';


@Injectable()
export class DashboardService {

  private user: any;
  private headers: Headers = new Headers();
  private options:RequestOptions;

  constructor(private http: Http, 
              private config: AppConfig,
              private _userService: UserService) { 
    
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });

    _userService.getUser().subscribe(
      data => {
        this.user = data;
      }
    )

  }

  getInfos() {
    return this.http.get(this.config.apiUrl + '/api/dashboard/' + this.user.Codigo);
  }


}
