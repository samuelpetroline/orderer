import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../_services/order/order.service';
import { Order } from 'app/_models/order';
import { User } from 'app/_models/user';
import { UserService } from 'app/_services/user/user.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private user: User;
  private orderList: Order[]

  constructor(private orderService: OrderService, private userService: UserService) {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;

        if (!this.user.isAdmin) {
          this.orderService.getByUser(this.user._id).subscribe(
            orders => {
              this.orderList = orders;
            },
            error => {
              console.log(error);
            }
          )
        }
        else {
          this.orderService.getAll().subscribe(
            orders => {
              this.orderList = orders;
            },
            error => {
              console.log(error);
            }
          )
        }
      },
      error => {
        console.log(error);
      }
    );



  }

  ngOnInit() {
  }

}
