import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { UsuarioPage } from "../usuario/usuario";
import { ServidorProvider } from "../../providers/servidor/servidor";
import { CredenciaisDTO } from "../models/credenciais";
import { BancoDTO } from "../models/dadosBanco";
import { numberTypeAnnotation } from "babel-types";
import { UsuarioPontosDTO } from "../models/dadosPontuacao";

/**
 * Generated class for the ResgataPontuacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-resgata-pontuacao",
  templateUrl: "resgata-pontuacao.html"
})
export class ResgataPontuacaoPage {

  //pontuacao: number = JSON.parse(localStorage.getItem("pontuacaoFinal"));

  usuario: BancoDTO = {
    usuario_final: JSON.parse(localStorage.getItem("usuario")),
    banco: "",
    agencia: "",
    tipo_conta: "",
    conta: "",
    valor: 0
  };

  usuarioPontos: UsuarioPontosDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    pontuacao: JSON.parse(localStorage.getItem("pontuacaoFinal"))
  };


  valorPt: number;
  valorDuplo: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, public servidor: ServidorProvider) { }

  ionViewDidLoad() {
    console.log("pontuacao", this.usuarioPontos.pontuacao);
  }

  getValorRetirada() {
    if (this.usuarioPontos.pontuacao > 499) {
      this.valorPt = 1;
    }
    if (this.usuarioPontos.pontuacao > 999) {
      this.valorPt = 1;
      this.valorDuplo = 1;
    }
  }
  resgatarPontos() {
    this.servidor.resgatarPontos(this.usuario).subscribe(
      data => {

        if (this.usuario.valor == 10) {
          this.usuarioPontos.pontuacao = this.usuarioPontos.pontuacao - 500;
        } else if (this.usuario.valor == 20) {
          this.usuarioPontos.pontuacao = this.usuarioPontos.pontuacao - 1000;
        }
        console.log('aqui', this.usuario.valor);
        console.log('aqui2', this.usuarioPontos.pontuacao);


        this.servidor.atualizarPontuacao(this.usuarioPontos).subscribe(
          () => {
            this.navCtrl.setRoot(UsuarioPage);
            this.toast
              .create({
                message: "Solicitação Realizada com Sucesso ",
                position: "botton",
                duration: 3000
              })
              .present();
          },
          error => {
            console.log(error);
            this.toast
              .create({
                message: "Erro ao realizar solicitação. Erro: " + error.error.message,
                position: "botton",
                duration: 3000
              })
              .present();
          }
        );
      })
  }
}
