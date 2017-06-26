import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../_services/Product/product.service';
import { UserService } from '../../_services/User/user.service';
import { OrderService } from '../../_services/Order/order.service';

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
      this._orderService.getOrderById(+params['id']).subscribe(
        data => {          
          this.order = JSON.parse(data.json());
        },
        error => {
          console.log(error);
        }
      )
    });
  }

}
