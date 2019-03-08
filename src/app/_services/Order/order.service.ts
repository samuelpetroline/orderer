import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import 'rxjs/add/operator/map'

import { BaseService } from '../base.service';
import { Order } from 'app/_models/order';
import { OrderProduct } from 'app/_models/order.product';
import { Utils } from 'app/utils';

@Injectable()
export class OrderService extends BaseService {

  private orderSource: BehaviorSubject<Order>;
  currentOrder: Observable<Order> = this.orderSource.asObservable();

  constructor() {
    super();
        
    this.orderSubject = new BehaviorSubject(null);

    this.orderSubject.subscribe(data => this.currentOrder = data);

    let order = JSON.parse(localStorage.getItem('order'));
    if (order) {
      this.orderSubject.next(order);
    }
  }

  update(order: Order) {
    this.orderSource.next(order);
    localStorage.setItem('order', JSON.stringify(order));
  }

  finishOrder(order: Order) {
    return this.post('/order', order);
  }

  getOrdersByUser(id: number) {
    return this.get('/order/user/' + id);
  }

  getOrderById(id: number) {
    return this.get('/order/' + id);
  }

  getAllOrders() {
    return this.get('/order');
  }

}
