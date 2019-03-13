import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../_services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public active: boolean;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.getStatus().subscribe((status: boolean) => {
      this.active = status;
    });
  }

}
