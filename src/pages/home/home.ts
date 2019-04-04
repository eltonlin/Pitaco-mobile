import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Subscriber } from 'rxjs/Subscriber';
import { CadastroPage } from '../cadastro/cadastro';
<<<<<<< HEAD
import { stringLiteral, throwStatement } from 'babel-types';
=======
>>>>>>> 1f215fcfad9536f85178cead8d7393bd4cf8c56d
import { UsuarioPage } from '../usuario/usuario'


import { SelectorContext } from '@angular/compiler';
import { CredenciaisDTO } from '../models/credenciais';
import { PreferenciasPage } from '../preferencias/preferencias';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Storage} from '@ionic/storage';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //usuario: any;
  isTextFieldType: boolean;
  //login_usuario: string;
  // senha: string;

  usuario: CredenciaisDTO = {
    login_usuario: "",
    senha: ""
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
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
<<<<<<< HEAD
      this.servidor.logar(this.usuario).subscribe(response => {
        //window.localStorage.setItem("usuario", this.usuario.login_usuario);
        localStorage.setItem("usuario", JSON.stringify(this.usuario.login_usuario));

        this.navCtrl.setRoot(UsuarioPage);
      }, error => {
        this.toast.create({
          message: "Erro ao realizar cadastro. Erro: " + error.error.message, position: 'botton', duration: 3000
=======
      this.servidor.logar(this.usuario).subscribe(response => { 
        window.localStorage.setItem("usuario", response.usuario.login_usuario);
        this.navCtrl.setRoot(UsuarioPage);
      }, err => {
        this.toast.create({
          message: err.error.message, position: 'botton', duration: 3000
>>>>>>> 1f215fcfad9536f85178cead8d7393bd4cf8c56d
        }).present();
      });
      //});
      }
    }
  
}



