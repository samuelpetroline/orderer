import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../../_services/User/user.service';
import { DashboardService } from '../../_services/Dashboard/dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboard: any = {};
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    
  }
 
  public chartHovered(e:any):void {
    
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];


  constructor(private _dashboard: DashboardService) { }

  ngOnInit() {
    this._dashboard.getInfos().subscribe(
      data => {
          this.dashboard = JSON.parse(data.json());
          console.log(this.dashboard);

          this.doughnutChartLabels = this.dashboard.Graficos[0].Labels;
          this.doughnutChartData = this.dashboard.Graficos[0].Valores;

          this.barChartLabels = this.dashboard.Graficos[1].Labels;
          this.barChartData = this.dashboard.Graficos[1].Valores;

          console.log(this.doughnutChartLabels);
          console.log(this.doughnutChartData);
      }
    )
  }



  
 

}
