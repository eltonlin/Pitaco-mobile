import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { StorageService } from '../../providers/servidor/storage.service';

import { Storage } from "@ionic/storage";
import { PreferenciasPage } from '../preferencias/preferencias';
import { LocalUser } from "../models/local_user";
import { HomePage } from '../home/home';



@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  login_usuario: string;
 




  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public servidor: ServidorProvider) {

  }

  preferencias() {
    this.navCtrl.push(PreferenciasPage);
  }

  ionViewWillEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.login_usuario) {
      this.login_usuario = localUser.login_usuario;
    }

    //console.log('ionViewWillEnter');
  }

  sair() {
    this.navCtrl.setRoot(HomePage);
  }
}






