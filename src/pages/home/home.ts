import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Subscriber } from 'rxjs/Subscriber';
import { UsuarioPage } from '../usuario/usuario';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  login_usuario: string;
  senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController,public servidor:ServidorProvider, public http: Http, public toast: ToastController) {

  }

  goToCadastro(){
    this.navCtrl.push(CadastroPage);
  }

    logar(){
      if(this.login_usuario == undefined || this.senha == undefined){
          let alert = this.alertCtrl.create({
            title: 'Atenção',
            message: 'Preencha todos os campos!',
            buttons: ['OK']
          })
          alert.present(); 
      } else{
        return new Promise ((resolve,reject) =>{
        
            this.servidor.salvarUsuario(this.login_usuario + this.senha).subscribe((result: any) =>{
              resolve(result);
              
            },
            (error) => {
           reject;
            }
           
            )}
        )
        }
  }
}