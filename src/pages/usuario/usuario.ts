import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';

import { Storage } from "@ionic/storage";
import { PreferenciasPage } from '../preferencias/preferencias';
import { HomePage } from '../home/home';
import { CredenciaisDTO } from '../models/credenciais';




@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {


  usuario: CredenciaisDTO = {
    login_usuario: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public servidor: ServidorProvider) {

  }

  preferencias() {
    this.navCtrl.setRoot(PreferenciasPage);
  }


  ionViewDidLoad() {

    const localData = localStorage.getItem('usuario');
    try {
      if (localData) {
        this.usuario = JSON.parse(localData);
        console.log('Data loaded', localData);
      }
    } catch (error) { }

  }
  
  sair() {
    window.localStorage.removeItem('usuario');
    this.navCtrl.setRoot(HomePage);

  }
}






