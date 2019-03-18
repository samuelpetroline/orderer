import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

import { UserService } from '../user/user.service';
import { ApiService } from '../api.service';
import { User } from 'app/_models/user';


@Injectable()
export class DashboardService {

  private user: User;

  constructor(private apiService: ApiService,
    private userService: UserService) {

    userService.getUser().subscribe(
      data => {
        this.user = data;
      });

  }

  getInfos() {
    return this.apiService.get('/dashboard/' + this.user._id);
  }


}
