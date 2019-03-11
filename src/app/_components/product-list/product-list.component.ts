import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../_services/Product/product.service';
import { UserService } from '../../_services/User/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  user: any = {};

  constructor(private _prodService: ProductService,
              private router: Router,
              private _userService: UserService) { }

  productList: any[];
  productListInactive: any[];

  ngOnInit() {
    this._prodService.getAll(true)
      .subscribe(
        data => {
          this.productList = JSON.parse(data);
        },
        error => {
          console.log(error);
        }
      );

      this._userService.getUser().subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.log(error);
        }
      );

      if (this.user.Admin) {
        this._prodService.getAll(false)
          .subscribe(
            data => {
              this.productListInactive = JSON.parse(data);
            },
            error => {
              console.log(error);
            }
          );
      }
  }

}
