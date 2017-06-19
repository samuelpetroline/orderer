import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../../_services/User/user.service';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input()
  data: any;

  user: any;

  constructor(private _userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.user = JSON.parse(this.data);
    }
  }

  logout() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }

}
