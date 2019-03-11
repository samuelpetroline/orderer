import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../../_services/User/user.service';
import { OrderService } from '../../_services/Order/order.service';
import { Product } from '../../_models/product';
import { Order } from 'app/_models/order';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() data: Order;
  user: any = {};

  private order: Order;

  constructor(private _userService: UserService,
              private orderService: OrderService,
              private router: Router) {

    orderService.getCurrentOrder().subscribe(data => {
      this.order = data;
    });

  }

  getCartItemsAmount(): number {
    return this.order && this.order.products ? this.order.products.length : 0;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.user = this.data;
    }
  }

  logout() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }

}
