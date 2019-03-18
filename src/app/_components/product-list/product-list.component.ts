import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../_services/product/product.service';
import { UserService } from '../../_services/user/user.service';
import { User } from 'app/_models/user';
import { Observable } from 'rxjs';
import { Product } from 'app/_models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  private productList$: Observable<Product>;
  private user: User;

  constructor(private productService: ProductService,
    private userService: UserService) { }

  ngOnInit() {

    this.productList$ = this.productService.getAll(true);

    this.userService.getUser().subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.log(error);
      }
    );

  }

}
