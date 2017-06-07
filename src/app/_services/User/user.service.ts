import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  private subject = new Subject<any>();

  constructor() { }

}
