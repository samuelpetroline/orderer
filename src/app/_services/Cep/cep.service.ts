import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

import { AppConfig } from '../../app.config';
import { ApiService } from '../api.service';

@Injectable()
export class CepService {

  constructor(private apiService: ApiService) { }

  //consultar(cep: Observable<string>){
  //  return cep.switchMap(data => this.consultarCEP(data));
  //}

  consultarCEP(value) {
    return this.apiService.get(AppConfig.cepWS + '/' + value + '/json/').map(res => res.json())
  }


}
