import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../_services/User/user.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [UserService]
})
export class MainPageComponent implements OnInit {

  @Input() id: string;
  user: any;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.getUserById(this.id);
    console.log(this.user);
  }

}
