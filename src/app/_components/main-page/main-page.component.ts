import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../../_services/user/user.service';
import { User } from 'app/_models/user';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private user: User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {


  }

}
