import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../_services/alert/alert.service';
import { ProductService } from '../../_services/product/product.service';

@Component({
  selector: 'product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  private product: any = {};
  private id: number;
  private isEdit: boolean = false;

  constructor(private alert: AlertService,
              private _productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.product.Imagem = this._productService.getNoImageDataURL();

    this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this._productService.getById(+params['id']).subscribe(
          data => {
            this.product = JSON.parse(data);
            this.isEdit = true;
          },
          error => {
            console.log(error);
          }
        );
      }
    );


  }

  handleImageSelect(event) {
    var files = event.target.files;
    var file = files[0];

    if (this.isImage(file)) {
      if (files && file) {
        var reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
      }
    }
    else {
      this.alert.error("Este arquivo não é uma imagem !");
    }
  }

  _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.product.Imagem = "data:image/jpg;base64," + btoa(binaryString);
    }

  isImage(file) {
    return file['type'].split('/')[0] == 'image';
  }

  addProduct() {
    if (!this.isEdit) {
      this._productService.create(this.product).subscribe(
        data => {
          this.alert.success("Criado com sucesso !");
          this.router.navigate(['../product-list'], { relativeTo: this.route });
        },
        error => {
          this.alert.error("Erro ao criar o produto ! Tente novamente, por favor");
        }
      );
    }
    else {
      this.editProduct();
    }
  }

  editProduct() {
    this._productService.update(this.product).subscribe(
      data => {
        this._productService.getById(this.product.Codigo).subscribe(
          prod => {
            this.product = JSON.parse(prod);
          }
        )
        this.alert.success("Editado com sucesso !");
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProduct() {
    this._productService.delete(this.id).subscribe(
      data => {
          this.alert.success("Excluído com sucesso !");
          this.router.navigate(['../../product-list'], { relativeTo: this.route });
      },
      error => {
        this.alert.error(error);
      }
    )
  }

}
