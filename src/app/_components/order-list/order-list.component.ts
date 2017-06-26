import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../_services/Order/order.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private user: any = {};
  private orderList: any[] = [];

  constructor(private _orderService: OrderService) { 
    this.user = JSON.parse(localStorage.getItem('user'));

    if (!this.user.Admin) {    
      this._orderService.getOrdersByUser(this.user.Codigo).subscribe(
        data => {
          this.orderList = JSON.parse(data.json());
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      this._orderService.getAllOrders().subscribe(
        data => {
          this.orderList = JSON.parse(data.json());
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
