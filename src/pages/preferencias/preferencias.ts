import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { UsuarioPage } from "../usuario/usuario";
import { ServidorProvider } from "../../providers/servidor/servidor";
import { PreferenciasDTO } from "../models/preferencias";

/**
 * Generated class for the PreferenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-preferencias",
  templateUrl: "preferencias.html"
})
export class PreferenciasPage {
  usuario_interesse: PreferenciasDTO = {
    usuario_final: "",
    interesses: []
  };

  constructor(
    public navCtrl: NavController,
    public toast: ToastController,
    public servidor: ServidorProvider,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PreferenciasPage");
  }

  salvarPreferencias() {
    this.usuario_interesse.usuario_final = localStorage.getItem("usuario");
    localStorage.setItem(
      "interesses",
      JSON.stringify(this.usuario_interesse.interesses)
    );
    this.servidor.salvarPreferencias(this.usuario_interesse).subscribe(
      item => {
        this.navCtrl.setRoot(UsuarioPage);
        this.toast
          .create({
            message: "Cadastro de Preferências Realizado com Sucesso ",
            position: "botton",
            duration: 3000
          })
          .present();
      },
      error => {
        this.toast
          .create({
            message:
              "Erro ao realizar cadastro de preferências. Erro: " +
              error.error.message,
            position: "botton",
            duration: 3000
          })
          .present();
      }
    );
  }

  /*public form = [
    { val: 'Comida' },
    { val: 'Bebida'},
    { val: 'Jogos' },
    { val: 'Música' },
    { val: 'Esporte'},
    { val: 'Carros' },
    { val: 'Livros'},
    { val: 'Filmes' },
    { val: 'Política'},
    { val: 'Eletronicos' },
    { val: 'Viagens'},
    { val: 'Educação' },
    { val: 'Fofoca'},
    { val: 'Internet' },
    { val: 'Economia'}
  ];*/

  public descricao = [
    { descricaoId: 1, descricaoNome: "Comida", checked: false },
    { descricaoId: 2, descricaoNome: "Bebida", checked: false },
    { descricaoId: 3, descricaoNome: "Jogos", checked: false },
    { descricaoId: 4, descricaoNome: "Música", checked: false },
    { descricaoId: 5, descricaoNome: "Esporte", checked: false },
    { descricaoId: 6, descricaoNome: "Carros", checked: false },
    { descricaoId: 3, descricaoNome: "Livros", checked: false },
    { descricaoId: 4, descricaoNome: "Filmes", checked: false },
    { descricaoId: 5, descricaoNome: "Política", checked: false },
    { descricaoId: 6, descricaoNome: "Eletronicos", checked: false },
    { descricaoId: 3, descricaoNome: "Viagens", checked: false },
    { descricaoId: 4, descricaoNome: "Educação", checked: false },
    { descricaoId: 5, descricaoNome: "Fofoca", checked: false },
    { descricaoId: 6, descricaoNome: "Internet", checked: false },
    { descricaoId: 6, descricaoNome: "Economia", checked: false }
  ];
}
