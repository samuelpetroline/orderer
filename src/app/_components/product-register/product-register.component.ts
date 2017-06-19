import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../_services/Alert/alert.service';
import { ProductService } from '../../_services/Product/product.service';

@Component({
  selector: 'product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  private product: any = {};

  constructor(private alert: AlertService,
              private _productService: ProductService,
              private route: Router) { }

  ngOnInit() {
    this.product.Imagem = this._productService.getNoImageDataURL();
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
    this._productService.create(this.product).subscribe(
      data => {
        this.alert.success("Criado com sucesso !!!");
        this.route.navigate(['../product-list']);
      },
      error => {
        this.alert.error("Erro ao criar o produto ! Tente novamente, por favor");
      }
    )
  }

}
