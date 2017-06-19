import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../../app.config';

@Injectable()
export class CepService {

  constructor(private http: Http, private config: AppConfig) { }

  //consultar(cep: Observable<string>){
  //  return cep.switchMap(data => this.consultarCEP(data));    
  //}

  consultarCEP(value) {
    return this.http.get(this.config.cepWS + '/' + value + '/json/').map(res => res.json())
  }


}
