import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../_services/order/order.service';
import { Order } from 'app/_models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private orderService: OrderService) {}

  private currentOrder: Order;

  ngOnInit() {

    this.orderService.getCurrentOrder().subscribe(
      order => {
        this.currentOrder = order;
      },
      error => {
        console.log(error);
      }
    )
  }

  getTotalAmount() {
    return this.currentOrder.products
        .map(item => item.amount * item.unitValue).reduce((prev, next) => prev + next);
  }

  cancelOrder() {
    this.orderService.clear();
  }

  finishOrder() {
    this.orderService.finish().subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    );

  }

  removeProduct(item: any) {
    //this.orderService.removeFromCart(item);
  }

  increaseQty(item: any) {
    item.Quantidade++;
  }

  decreaseQty(item: any) {
    if (item.Quantidade != 1)
      item.Quantidade--;
  }

}
