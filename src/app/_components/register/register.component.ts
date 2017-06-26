import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { AlertComponent } from '../../_directives/alert/alert.component';
import { LoadingService } from '../../_services/Loading/loading.service';
import { AlertService } from '../../_services/Alert/alert.service';
import { UserService } from '../../_services/User/user.service';
import { CepService } from '../../_services/Cep/cep.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  step: number;
  model: any = {};

  registerBillingInfo = false;

  filterString: Subject<string> = new Subject<string>();

  constructor(
    public loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private cepService: CepService) { 
      
      this.model.endereco = {};
      /*this.cepService.consultar(this.filterString)
        .subscribe(result => {
          this.model.endereco = result;
        }, 
        error => console.log(error));*/
    }

  consultarCEP(cep: string) {
    if (cep.length == 8) {
      this.cepService.consultarCEP(cep)
        .subscribe(result => {
          this.model.endereco = result;
        },
        error => console.log(error));
    }
  }

  ngOnInit() {
    this.loading.stop();    
    this.step = 1;
    this.model.payment = 1;
  }

  previous() {

    if (this.step != 1) {
      this.step--;
    } else {
      this.router.navigate(['/login']);
    }

  }

  next() {
   if (this.step != 3) {    
      this.step++;
    }
    else {
      this.register();
    }
  }


  register() {
  
    this.userService.create(this.model).subscribe(
      response => {
        this.alertService.success("Parabéns, tudo certo !");
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error("Poxa, não foi possível criar a sua conta :( Tente novamente mais tarde");
      }
    )
    
    this.next();
  }

}
