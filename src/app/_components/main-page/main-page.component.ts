import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../_services/User/user.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  user: any = {};

  constructor(private _userService: UserService) {
    this._userService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    );
   }

  ngOnInit() {
    

  }

}
