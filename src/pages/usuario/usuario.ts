<<<<<<< HEAD
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
=======
import { HomePage } from "./../home/home";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
>>>>>>> b315695777a73d761ee6fbfc9ae20f5659f4e5e3
import { ServidorProvider } from "../../providers/servidor/servidor";

import { Storage } from "@ionic/storage";
import { PreferenciasPage } from "../preferencias/preferencias";
<<<<<<< HEAD
import { HomePage } from "../home/home";
import { CredenciaisDTO } from "../models/credenciais";
import { CadastroPage } from "../cadastro/cadastro";
import { JsonPipe } from "@angular/common";
=======
import { CredenciaisDTO } from "../models/credenciais";
import { CadastroPage } from "../cadastro/cadastro";
import { PontuacaoDTO } from "../models/pontos";
import { EditarPage } from "../editar/editar";
>>>>>>> b315695777a73d761ee6fbfc9ae20f5659f4e5e3

@Component({
  selector: "page-usuario",
  templateUrl: "usuario.html"
})
export class UsuarioPage {
  usuario: CredenciaisDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    senha: ""
  };

<<<<<<< HEAD
  pontuacao: any;
=======
  pontuacao: string;
>>>>>>> b315695777a73d761ee6fbfc9ae20f5659f4e5e3

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
<<<<<<< HEAD
        console.log("pontuação do usuario" + pontuacaoPorUsuario);
        this.pontuacao = pontuacaoPorUsuario;
        console.log("Data loo", this.usuario.login_usuario);
        console.log("Data loo", this.pontuacao);
      });
  }

=======
        console.log(pontuacaoPorUsuario);

        this.pontuacao = JSON.stringify(pontuacaoPorUsuario);
        this.pontuacao = this.pontuacao.replace(/[\[\]PONTUACAO":{}]/g, "");

        //this.pontuacao = JSON.parse(localStorage.getItem('pontuacao'))
        console.log("Data loo", this.usuario.login_usuario);
        console.log("Data loo", this.pontuacao);
      });
  }

>>>>>>> b315695777a73d761ee6fbfc9ae20f5659f4e5e3
  sair() {
    window.localStorage.removeItem("usuario");
    this.navCtrl.setRoot(HomePage);
  }
}
