import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../_services/Order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _orderService: OrderService) { }

  itemList: Product[];
  totalAmount: number;

  ngOnInit() {

    this._orderService.getProducts().subscribe(
      data => {
        this.itemList = data
      },
      error => {
        console.log(error);
      }
    )

    this.getTotalAmount();
  }

  getTotalAmount() {

    this._orderService.getProducts().subscribe(products => {
      this.totalAmount = products.map(item => item.price * item.quantity).reduce((prev, next) => prev + next);
    });

  }

  cancelOrder() {
    this._orderService.removeAllFromCart();
  }

  finishOrder() {
    this._orderService.finishOrder(this.itemList).subscribe(
      data => {
        this._orderService.removeAllFromCart();
      },
      error => {
        console.log(error);
      }
    )
  }

  removeProduct(item: any) {
    this._orderService.removeFromCart(item);
  }

  increaseQty(item: any) {
    item.Quantidade++;

    this.getTotalAmount();
  }

  decreaseQty(item: any) {
    if (item.Quantidade != 1)
      item.Quantidade--;

    this.getTotalAmount();
  }

}
