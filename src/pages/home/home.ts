import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Subscriber } from 'rxjs/Subscriber';
import { UsuarioPage } from '../usuario/usuario';
import { CadastroPage } from '../cadastro/cadastro';
import { stringLiteral } from 'babel-types';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: any;
  login_usuario: string;
  senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public servidor: ServidorProvider, public http: Http, public toast: ToastController) {
   
    this.usuario = {};

  }

  goToCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  logar() {
    if (this.usuario.login_usuario == undefined || this.usuario.senha == undefined) {
       let alert = this.alertCtrl.create({
         title: 'Atenção',
         message: 'Preencha todos os campos!',
         buttons: ['OK']
       })
       alert.present();
     } else { 
    return new Promise((resolve, reject) => {
      this.servidor.logar(this.usuario).subscribe((result: any) => {
        resolve(result);
        //this.navCtrl.push(UsuarioPage);
      },
        (error) => {
          reject(error.json());
        })
    });

    }
  }


}

