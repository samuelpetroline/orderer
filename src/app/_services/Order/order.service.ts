import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map'
 
import { Product } from '../../_models/product';
import { AppConfig } from '../../app.config';

@Injectable()
export class OrderService {

  private headers: Headers = new Headers();
  private options: RequestOptions
  private productListSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  productList: any[] = [];

  constructor(private http: Http,
              private config: AppConfig) {
      this.headers.append('Content-Type', 'application/json');
      this.options = new RequestOptions({ headers: this.headers });

      this.productListSubject.subscribe(data => this.productList = data);

      let storage = JSON.parse(localStorage.getItem('order'));

      if (storage) {
        this.productListSubject.next(storage);
      }
  }

  addProduct(product: any) {

    var isFound: boolean = false;

    for (var i = 0; i < this.productList.length; i++) {
      if (this.productList[i].Codigo == product.Codigo) {      
        this.productList[i].Quantidade++;
        isFound = true;
      }      
    }  

    if (!isFound) {      
      this.productListSubject.next([...this.productList, product]);      
    }

    this.productList.forEach((element, index, array) => {
      if (element.Quantidade === 0) 
        element.Quantidade = 1;
    });

    this.productListSubject.next(this.productList);  

    this.setLocalStorage(this.productList);
  }

  getProducts(): Observable<any[]> {
    return this.productListSubject;
  }

  getTotalAmount(): Observable<number> {
    return this.productListSubject.map((items: any[]) => {
      return items.reduce((prev, curr: any) => {
        return prev + curr.Valor * curr.Quantidade;
      }, 0);
    });
  }

  removeFromCart(item: any) {
    const currentItems = [...this.productList];
    const itemsWithoutRemoved = currentItems.filter(data => data.Codigo !== item.Codigo);
    this.productListSubject.next(itemsWithoutRemoved);
    this.setLocalStorage(this.productList);
  }

  removeAllFromCart() {
    this.productListSubject.next([]);
    this.setLocalStorage(this.productList);
  }

  setLocalStorage(list: any[]) {
   localStorage.setItem('order', JSON.stringify(this.productList)); 
  }

  finishOrder(items: any[]) {
    if (items.length > 0) {      
      let request : any = {};
      request.Produtos = items;
      request.Cliente = JSON.parse(localStorage.getItem('user'));

      return this.http.post(this.config.apiUrl + '/api/orders', JSON.stringify(request), this.options);
    }    
  }

  getOrdersByUser(id: number) {
    return this.http.get(this.config.apiUrl + '/api/orders/user/' + id, this.options);
  }

  getOrderById(id: number) {
    return this.http.get(this.config.apiUrl + '/api/orders/' + id, this.options);
  }

  getAllOrders() {
    return this.http.get(this.config.apiUrl + '/api/orders', this.options);
  }

}
