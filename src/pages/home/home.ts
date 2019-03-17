import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { ServidorProvider } from '../../providers/servidor/servidor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, servidor: ServidorProvider, navParams: NavParams) {

  }

  goToCadastro(){
    this.navCtrl.push(CadastroPage);
  }
}
