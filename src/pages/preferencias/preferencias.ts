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
    usuario_final:  JSON.parse(localStorage.getItem('usuario')),//localStorage.getItem('usuario'),
    interesses: "" // new Array()
  };


  constructor(public navCtrl: NavController, public toast: ToastController, public servidor: ServidorProvider, public navParams: NavParams) {
  
  }


  salvarPreferencias() {
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

  }

 /* descricao: Array < { value: number, descricaoNome: string } > = [
    { value: 1, descricaoNome: 'Música' },
    { value: 2, descricaoNome: 'Esporte' },
    { value: 3, descricaoNome: 'Carros' },
    { value: 4, descricaoNome: 'Filmes' },
    { value: 5, descricaoNome: 'Comida' },
    { value: 6, descricaoNome: 'Bebida' },
    { value: 7, descricaoNome: 'Política' },
    { value: 8, descricaoNome: 'Eletronicos' },
    { value: 9, descricaoNome: 'Viagens' },
    { value: 10, descricaoNome: 'Educação' },
    { value: 11, descricaoNome: 'Fofoca' },
    { value: 12, descricaoNome: 'Internet' },
    { value: 13, descricaoNome: 'Economia' },
    { value: 14, descricaoNome: 'Livros' }
  ];*/

}
