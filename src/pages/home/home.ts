import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Subscriber } from 'rxjs/Subscriber';
import { CadastroPage } from '../cadastro/cadastro';
import { stringLiteral } from 'babel-types';
import { UsuarioPage } from '../usuario/usuario'


import { SelectorContext } from '@angular/compiler';
import { CredenciaisDTO } from '../models/credenciais';
import { StorageService } from '../../providers/servidor/storage.service';
import { PreferenciasPage } from '../preferencias/preferencias';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //usuario: any;
  isTextFieldType: boolean;
 // login_usuario: string;
  //senha: string;


  usuario: CredenciaisDTO = {
    login_usuario: "",
    senha: ""
  };

 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public servidor: ServidorProvider, public http: Http, public toast: ToastController) {

    //this.usuario = {};


  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
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
      // return new Promise((resolve, reject) => {
      this.servidor.logar(this.usuario).subscribe(response => { 
       //this.servidor.sucessoLogin (response.headers.get('Authorization'));
        this.navCtrl.setRoot(UsuarioPage);
      }, error => {
        if (error.status == 400) {
          this.navCtrl.setRoot('HomePage');
        }
      });
      //});
    }
  }



}



