import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ServidorProvider } from "../../providers/servidor/servidor";

import { Storage } from "@ionic/storage";
import { PreferenciasPage } from "../preferencias/preferencias";
import { HomePage } from "../home/home";
import { CredenciaisDTO } from "../models/credenciais";
import { CadastroPage } from "../cadastro/cadastro";

@Component({
  selector: "page-usuario",
  templateUrl: "usuario.html"
})
export class UsuarioPage {
  usuario: CredenciaisDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    senha: ""
  };

  pontuacao: any;
  novaPontuacao: any;

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
    this.navCtrl.push(CadastroPage);
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
        this.novaPontuacao = this.pontuacao.replace(/[\[\]PONTUACAO":{}]/g, "");
        console.log("Data loo", this.usuario.login_usuario);
        console.log("Data loo", this.pontuacao);
        console.log("Replace", this.novaPontuacao);
      });
  }

  sair() {
    window.localStorage.removeItem("usuario");
    this.navCtrl.setRoot(HomePage);
  }
}
