import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../_services/Order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _orderService: OrderService) { }

  itemList: any[];
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
    this._orderService.getTotalAmount().subscribe(
      data => {
        this.totalAmount = data;
      },
      error => {
        console.log(error);
      }
    )
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
