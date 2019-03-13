import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OrderService } from '../../_services/order/order.service';
import { Order } from 'app/_models/order';
import { AuthenticationService } from 'app/_services/authentication/authentication.service';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() data: Order;
  user: any = {};

  private order: Order;

  constructor(private authService: AuthenticationService,
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
