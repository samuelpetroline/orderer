import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import 'rxjs/add/operator/map'

import { ApiService } from '../api.service';
import { Order } from 'app/_models/order';
import { OrderProduct } from 'app/_models/order.product';
import { Utils } from 'app/utils';

@Injectable()
export class OrderService {

  private orderSource: BehaviorSubject<Order>;
  currentOrder: Observable<Order> = this.orderSource.asObservable();

  constructor(private apiService: ApiService) {
    this.orderSource = new BehaviorSubject({} as Order);
  }

  update(order: Order) {
    this.orderSource.next(order);
    localStorage.setItem('order', JSON.stringify(order));
  }

  finish(order: Order) {
    return this.apiService.post('/order', order);
  }

  getByUser(id: number) {
    return this.apiService.get('/order/user/' + id);
  }

  getByID(id: number) {
    return this.apiService.get('/order/' + id);
  }

  getAll() {
    return this.apiService.get('/order');
  }

}
