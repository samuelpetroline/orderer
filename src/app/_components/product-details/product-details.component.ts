import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../_services/Product/product.service';
import { UserService } from '../../_services/User/user.service';
import { OrderService } from '../../_services/Order/order.service';
import { Product } from '../../_models/product';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  product: any = {};
  user: any = {};

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private _userService: UserService,
              private _orderService: OrderService) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService.getById(+params['id']).subscribe(
        data => {
          this.product = JSON.parse(data);
        },
        error => {
          console.log(error);
        }
      )
    });

    this._userService.getUser().subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.log(error);
        }
      )   
  }

  addToCart(event, product: Product) {
    event.stopPropagation();

    this._orderService.addProduct(product);
  }

}
