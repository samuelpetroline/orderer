import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../_services/Order/order.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private orderList: any[];

  constructor(private _orderService: OrderService) { 
    this._orderService.getOrdersByUser(JSON.parse(localStorage.getItem('user')).Codigo).subscribe(
      data => {
        this.orderList = JSON.parse(data.json());
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
  }

}
