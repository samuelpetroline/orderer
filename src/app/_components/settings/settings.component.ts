import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


import { UserService } from '../../_services/user/user.service';
import { AlertService } from '../../_services/alert/alert.service';
import { CepService } from '../../_services/cep/cep.service';

import { User } from 'app/_models/user';
import { Address } from 'app/_models/address';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;
  readonly maxFileSize = 2000 * 1024;

  constructor(private router: Router,
    private userService: UserService,
    private alert: AlertService,
    private cepService: CepService) {

    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });

  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
      },
      error => {
        this.alert.error(error);
      }
    );
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
    this.user.image = "data:image/jpg;base64," + btoa(binaryString);
  }

  isImage(file) {
    return file['type'].split('/')[0] == 'image';
  }

  updateUser() {
    this.userService.update(this.user).subscribe(
      data => {
        // this.userService.login(data.json());
        this.userService.update(data);

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
          this.user.address = new Address();
          this.user.address.city = result.localidade;
          this.user.address.complement = result.complemento
          this.user.address.quarter = result.bairro;
          this.user.address.state = result.uf;
          this.user.address.zipcode = result.cep;
        },
          error => this.alert.error(error)
        );
    }
  }

}
