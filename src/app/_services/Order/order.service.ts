import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import 'rxjs/add/operator/map'

import { ApiService } from '../api.service';
import { Order } from 'app/_models/order';
import { OrderProduct } from 'app/_models/order.product';
import { Utils } from 'app/utils';
import { Product } from 'app/_models/product';

@Injectable()
export class OrderService {

  private orderSource: BehaviorSubject<Order>;
  private currentOrder: Observable<Order> = this.orderSource.asObservable();

  constructor(private apiService: ApiService) {
    this.orderSource = new BehaviorSubject({} as Order);
  }

  getCurrentOrder() {
    return this.currentOrder;
  }

  update(order: Order) {
    this.orderSource.next(order);
    localStorage.setItem('order', JSON.stringify(order));
  }

  addProduct(product: Product, amount: number) {
    let order = this.orderSource.getValue();

    let newProduct = new OrderProduct();
    newProduct.amount = amount;
    newProduct.totalValue = product.price * amount;
    newProduct.unitValue = product.price;
    newProduct.item = product;

    order.products.push(newProduct);
    this.update(Utils.cloneObject(order));
  }

  clear() {
    this.update({} as Order);
  }

  finish() {
    return this.apiService.post('/order', this.currentOrder).map(result => {
      this.clear();
      return result;
    }).catch(error => {
      return Observable.throw(error.json());
    })
  }

  getByUser(id: string) {
    return this.apiService.get<Order[]>('/order/user/' + id);
  }

  getByID(id: string) {
    return this.apiService.get<Order>('/order/' + id);
  }

  getAll() {
    return this.apiService.get<Order[]>('/order');
  }

}
