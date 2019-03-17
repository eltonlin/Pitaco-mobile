import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public servidor: ServidorProvider, public toast: ToastController) {
    this.usuario={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }


  salvarUsuario(){
    this.servidor.salvarUsuario(this.usuario).subscribe( item => {
      this.navCtrl.pop();
      this.toast.create({
        message: "Cadastro Realizado com Sucesso"
      }). present();
    }, error =>{
        this.toast.create({
          message: "Erro ao realizar cadastro"
        }). present();
    })

  } 
}
