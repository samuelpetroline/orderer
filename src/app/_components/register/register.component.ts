import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { LoadingService } from '../../_services/loading/loading.service';
import { AlertService } from '../../_services/alert/alert.service';
import { UserService } from '../../_services/user/user.service';
import { CepService } from '../../_services/cep/cep.service';

import { User } from 'app/_models/user';
import { Address } from 'app/_models/address';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private step: number;
  model: User;

  registerBillingInfo = false;

  filterString: Subject<string> = new Subject<string>();

  constructor(
    public loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private cepService: CepService) {

      this.model.address = new Address();
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
          this.model.address = new Address();
          this.model.address.city = result.localidade;
          this.model.address.complement = result.complemento
          this.model.address.quarter = result.bairro;
          this.model.address.state = result.uf;
          this.model.address.zipcode = result.cep;
        },
        error => console.log(error));
    }
  }

  ngOnInit() {
    this.loadingService.hideLoader();
    this.step = 1;
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

    //this.next();
  }

}
