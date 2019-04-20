import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsuarioPage } from '../usuario/usuario';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { PreferenciasDTO } from '../models/preferencias';


/**
 * Generated class for the PreferenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferencias',
  templateUrl: 'preferencias.html',
})
export class PreferenciasPage {


  usuario: PreferenciasDTO = {
    usuario_final: JSON.parse(localStorage.getItem('usuario')),//localStorage.getItem('usuario'),
    interesses: new Array() //"" 
  };

  interesses: any = [];

  constructor(public navCtrl: NavController, public toast: ToastController, public servidor: ServidorProvider, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    
    console.log("ionViewDidLoad PreferenciasPage");
  

  }

  ionViewWillEnter(){
    this.obterPreferencias();
  }

  obterPreferencias() {
    this.servidor.obterPreferencias().subscribe(sucess => {
      this.interesses = sucess;
      for (let i = 0; i < this.interesses.length; i++) {
        this.interesses[i].checked = false;
      }
      this.servidor.obterPreferenciasPorUsuario(this.usuario.usuario_final).subscribe(
        interessePorUsuario => {
          console.log(interessePorUsuario);
          for (let i = 0; i < interessePorUsuario.length; i++) {
            for (let x = 0; x < this.interesses.length; x++) {
              console.log('Interesse do usuário' + interessePorUsuario);
              // console.log(this.interesses[x].id_interesse);
              // console.log(this.interesses);
              if (interessePorUsuario[i].id_interesse == this.interesses[x].id_interesse) {
                this.interesses[x].checked = true;
                console.log(this.interesses);
                break;
              }
            }
          }
          console.log(this.interesses);
        }
      )

    },
      erro => {

      });
  }


  salvarPreferencias() {
    this.usuario.interesses = new Array();
    
    for (let i = 0; i < this.interesses.length; i++) {
      //  console.log(this.usuario.interesses); 
      //  console.log('Checked ' + this.interesses[i].checked);
      if (this.interesses[i].checked) {
        this.usuario.interesses.push(this.interesses[i].id_interesse);
      }
    }
    if(this.usuario.interesses.length == 0){
      return this.toast.create({
        message: "É necessário ter ao menos um interesse marcado ", position: 'botton', duration: 3000
      }).present();
      
    }

    this.servidor.deletarInteressePorUsuario(this.usuario).subscribe(
      sucess => {
        this.servidor.salvarPreferencias(this.usuario).subscribe(
          sucess => {
            console.log(sucess)
            this.navCtrl.setRoot(UsuarioPage);
            this.toast.create({
              message: 'Cadastro de Preferências Realizado com Sucesso ', position: 'botton', duration: 3000
            }).present();
          }, error => {
            this.toast.create({
              message: "Erro ao realizar cadastro de preferências. Erro: " + error.error.message, position: 'botton', duration: 3000
            }).present();
    
          })
        },
        error => {
          this.toast.create({
            message: "Erro ao realizar cadastro de preferências. Erro: " + error.error.message, position: 'botton', duration: 3000
          }).present();
        }  
    )

  }
  /* salvarPreferencias() {
      this.servidor.salvarPreferencias(this.usuario).subscribe(item => {
        this.navCtrl.setRoot(UsuarioPage);
        this.toast.create({
          message: 'Cadastro de Preferências Realizado com Sucesso ', position: 'botton', duration: 3000
        }).present();
      }, error => {
        this.toast.create({
          message: "Erro ao realizar cadastro de preferências. Erro: " + error.error.message, position: 'botton', duration: 3000
        }).present();
      })
  
   } */


}