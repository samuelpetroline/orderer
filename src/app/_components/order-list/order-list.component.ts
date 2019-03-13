import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../_services/order/order.service';
import { Order } from 'app/_models/order';
import { User } from 'app/_models/user';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private user: User;
  private orderList: Order[]

  constructor(private _orderService: OrderService) {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (!this.user.isAdmin) {
      this._orderService.getByUser(this.user._id).subscribe(
        orders => {
          this.orderList = orders;
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      this._orderService.getAll().subscribe(
        orders => {
          this.orderList = orders;
        },
        error => {
          console.log(error);
        }
      )
    }

  }

  ngOnInit() {
  }

}
