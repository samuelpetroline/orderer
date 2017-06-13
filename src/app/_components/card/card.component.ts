import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_models/product';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product: Product;
  
  constructor() { }

  ngOnInit() {
  }

}
