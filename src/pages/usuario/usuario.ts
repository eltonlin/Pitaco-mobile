import { HomePage } from "./../home/home";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ModalController, AlertController } from "ionic-angular";
import { ServidorProvider } from "../../providers/servidor/servidor";
import { Storage } from "@ionic/storage";
import { PreferenciasPage } from "../preferencias/preferencias";
import { CredenciaisDTO } from "../models/credenciais";
import { CadastroPage } from "../cadastro/cadastro";
import { PontuacaoDTO } from "../models/pontos";
import { EditarPage } from "../editar/editar";
import { QuestionarioDTO } from "../models/questionario";
import { QuestionarioPage } from "../questionario/questionario";

@Component({
  selector: "page-usuario",
  templateUrl: "usuario.html"
})
export class UsuarioPage {
  questionarios: any;

  /* questionarios: QuestionarioDTO = {
     id_questionario: 0,
     descricao_questionario: "",
     pontuacao_questionario: 0
  
   };*/


  usuario: CredenciaisDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    senha: ""
  };

  pontuacao: string;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public servidor: ServidorProvider
  ) { }

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
        this.pontuacao = this.pontuacao.replace(/[\[\]PONTUACAO":{}]/g, "");// {["PONTUACAO": 5]}

        //this.pontuacao = JSON.parse(localStorage.getItem('pontuacao'))
        console.log("Data loo", this.usuario.login_usuario);
        console.log("Data loo", this.pontuacao);
      });

    this.servidor.buscarQuestionarios(this.usuario.login_usuario).subscribe(questionarioPorUsuario => {
      console.log('obs', questionarioPorUsuario);
      this.questionarios = questionarioPorUsuario;
    });

  }
  questionarioClick(questionarioDescricaoquestionario: string, questionarioIdquestionario: string) {
    let alert = this.alertCtrl.create({
      title: "Atenção",
      subTitle: "Você vai iniciar o questionário " + questionarioDescricaoquestionario,
      message: "Responda com atenção, pois ele não poderá ser respondido novamente.",
      buttons: ["OK"]
    });
    alert.present();

    localStorage.setItem( "questionario", questionarioIdquestionario);
    console.log("aqui", localStorage.setItem( "questionario", questionarioIdquestionario));
    // localStorage.setItem( "questionario",JSON.stringify(this.questionarios.id_questionario))
    // console.log("aqui",  localStorage.setItem( "questionario",JSON.stringify(this.questionarios.id_questionario)))
    this.navCtrl.setRoot(QuestionarioPage);
  }



  sair() {
    window.localStorage.removeItem("usuario");
    this.navCtrl.setRoot(HomePage);
  }
}
