import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../../_services/User/user.service';
import { AlertService } from '../../_services/Alert/alert.service';
import { CepService } from '../../_services/Cep/cep.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: any = {};
  readonly maxFileSize = 2000 * 1024;

  constructor(private router: Router,
              private _userService: UserService,
              private alert: AlertService,
              private cepService: CepService) {

    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(element); }
        }
      }
    });

    this._userService.getUser().subscribe(
        data => {
          this._userService.getUserById(data.Codigo).subscribe(
            user => {
              this.user = user;
            },
            error => {
              this.alert.error(error);
            }
          )
        },
        error => {
          this.alert.error(error);
        }
      )

   }

  ngOnInit() {
    this.user.Endereco = {};
  }

  handleImageSelect(event) {
    var files = event.target.files;
    var file = files[0];
    
    if (this.isImage(file)) {
      if (file.size <= this.maxFileSize) {        
        if (files && file) {
          var reader = new FileReader();

          reader.onload = this._handleReaderLoaded.bind(this);

          reader.readAsBinaryString(file);
        }    
      }
      else {
        this.alert.error("Tamanho máximo do arquivo não pode passar de 2 MB !");
      }
    }
    else {
      this.alert.error("Este arquivo não é uma imagem !");
    }
  }

  _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.user.Imagem = "data:image/jpg;base64," + btoa(binaryString);
    }

  isImage(file) {
    return file['type'].split('/')[0] == 'image';
  }

  updateUser() {
    this._userService.update(this.user).subscribe(
      data => {
        this._userService.login(data.json());
        
      },
      error => {
        this.alert.error(error);
      }
    );
  }

  consultarCEP(cep: string) {
    if (cep.length == 8) {
      this.cepService.consultarCEP(cep)
        .subscribe(result => {
          this.user.Endereco.Bairro = result.bairro;
          this.user.Endereco.Cep = result.cep;
          this.user.Endereco.Complemento = result.complemento;
          this.user.Endereco.Cidade = result.localidade;
          this.user.Endereco.Logradouro = result.logradouro;
          this.user.Endereco.Uf = result.uf;
          this.user.Endereco.Numero = "";
        },
        error => this.alert.error(error)
      );
    }
  }

}
