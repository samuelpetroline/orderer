import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../../_services/User/user.service';
import { OrderService } from '../../_services/Order/order.service';
import { Product } from '../../_models/product';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() data: any = {};
  user: any = {};

  public cartItemsObservable: Observable<any[]>;
  public cartItems: any[];

  constructor(private _userService: UserService,
              private _orderService: OrderService,
              private router: Router) {
                
    this.cartItemsObservable = this._orderService.getProducts();

    this.cartItemsObservable.subscribe(
      data => {
        this.cartItems = data;
      },
      error => {
        console.log(error);
      }
    )
                
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
