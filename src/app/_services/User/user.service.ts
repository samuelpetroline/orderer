import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { User } from '../../_models/user';
import { AppConfig } from '../../app.config';

@Injectable()
export class UserService {
  private subject = new Subject<User>();

  constructor(private http: Http, private config: AppConfig) { }

  login(user: any) {
    this.subject.next(user);
  }

  logout() {
    this.subject.next();
  }

  getUserById(_id : string) : Observable<User> {
    return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt());
  }

  update(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user._id, user, this.jwt());
    }

  private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}
