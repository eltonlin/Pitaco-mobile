import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuarios = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public servidor: ServidorProvider) {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UsuarioPage');

    this.servidor.list().subscribe(
      dados  => {
        this.usuarios = dados,
        err => console.log(err)
    });
  }

}
