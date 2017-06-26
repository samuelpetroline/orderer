import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product';
import { OrderService } from '../../_services/Order/order.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product: Product;
  @Input() user: any = {};
  
  constructor(private _orderService: OrderService) { }

  ngOnInit() {
  }

  addToCart(event, product: Product) {
    event.stopPropagation();

    this._orderService.addProduct(product);
  }

}
