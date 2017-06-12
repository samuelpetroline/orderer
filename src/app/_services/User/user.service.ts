import { Injectable } from '@angular/core';
import { User } from '../../_models/user';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  private subject = new Subject<User>();

  constructor() { }

  login(user: any) {
    this.subject.next(user);
  }

  logout() {
    this.subject.next();
  }

  getUser() : Observable<User> {
    return this.subject.asObservable();
  }

}
