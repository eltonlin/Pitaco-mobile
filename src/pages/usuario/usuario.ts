import { HomePage } from "./../home/home";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { ServidorProvider } from "../../providers/servidor/servidor";

import { Storage } from "@ionic/storage";
import { PreferenciasPage } from "../preferencias/preferencias";
import { CredenciaisDTO } from "../models/credenciais";
import { CadastroPage } from "../cadastro/cadastro";
import { PontuacaoDTO } from "../models/pontos";
import { EditarPage } from "../editar/editar";

@Component({
  selector: "page-usuario",
  templateUrl: "usuario.html"
})
export class UsuarioPage {
  usuario: CredenciaisDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    senha: ""
  };

  pontuacao: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public servidor: ServidorProvider
  ) {}

  preferencias() {
    this.navCtrl.setRoot(PreferenciasPage);
  }

  editar() {
    this.navCtrl.push(EditarPage);
  }

  ionViewDidLoad() {
    /* const localData = localStorage.getItem('usuario');
    try {
      if (localData) {
        this.usuario = JSON.parse(localData);
        console.log('Data loaded', localData); 
       
      }
    } catch (error) { } */

    this.servidor
      .obterPontuacaoPorUsuario(this.usuario.login_usuario)
      .subscribe(pontuacaoPorUsuario => {
        console.log(pontuacaoPorUsuario);

        this.pontuacao = JSON.stringify(pontuacaoPorUsuario);
        this.pontuacao = this.pontuacao.replace(/[\[\]PONTUACAO":{}]/g, "");

        //this.pontuacao = JSON.parse(localStorage.getItem('pontuacao'))
        console.log("Data loo", this.usuario.login_usuario);
        console.log("Data loo", this.pontuacao);
      });
  }

  sair() {
    window.localStorage.removeItem("usuario");
    this.navCtrl.setRoot(HomePage);
  }
}
