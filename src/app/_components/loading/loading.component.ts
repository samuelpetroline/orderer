import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../_services/Loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public active: boolean;

  constructor(loading: LoadingService) {
    loading.status.subscribe((status: boolean) => {
      this.active = status;
    })
   }

  ngOnInit() {
  }

}
