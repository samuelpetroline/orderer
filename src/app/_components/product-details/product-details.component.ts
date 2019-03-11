import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../_services/product/product.service';
import { UserService } from '../../_services/user/user.service';
import { OrderService } from '../../_services/order/order.service';

import { Product } from '../../_models/product';
import { User } from 'app/_models/user';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  user: User;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private userService: UserService,
              private orderService: OrderService) { }

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

    this.userService.getUser().subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  addToCart(event, product: Product, amount: number) {
    event.stopPropagation();

    this.orderService.addProduct(product, amount);
  }

}
