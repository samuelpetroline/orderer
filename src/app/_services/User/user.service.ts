import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { AppConfig } from '../../app.config';

@Injectable()
export class UserService {
  private subject = new Subject<any>();
  private headers: Headers = new Headers();
  private options:RequestOptions;

  constructor(private http: Http, private config: AppConfig) {
    this.headers.append('Content-Type', 'application/json');

    this.options = new RequestOptions({ headers: this.headers });
   }

   getUser() {
     return localStorage.getItem('user');
   }

  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.subject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.subject.next();
  }

  getUserById(_id : string) : Observable<any> {
    return this.http.get(this.config.apiUrl + '/api/users/' + _id).map((response: Response) => response.json());
  }

  create(user: any) {
    return this.http.post(this.config.apiUrl + '/api/users', JSON.stringify(user), this.options);
  }

  update(user: any) {
        return this.http.put(this.config.apiUrl + '/api/users/' + user._id, JSON.stringify(user), this.options);
    }

}
