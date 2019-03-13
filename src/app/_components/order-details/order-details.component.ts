import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user/user.service';
import { OrderService } from '../../_services/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  private order: any = {};

  constructor(private route: ActivatedRoute,
              private _userService: UserService,
              private _orderService: OrderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._orderService.getByID(params['id']).subscribe(
        order => {
          this.order = order;
        },
        error => {
          console.log(error);
        }
      )
    });
  }

}
