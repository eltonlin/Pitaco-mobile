import { HomePage } from "./../home/home";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  AlertController,
  ToastController
} from "ionic-angular";
import { ServidorProvider } from "../../providers/servidor/servidor";
import { Storage } from "@ionic/storage";
import { PreferenciasPage } from "../preferencias/preferencias";
import { CredenciaisDTO } from "../models/credenciais";
import { CadastroPage } from "../cadastro/cadastro";
import { PontuacaoDTO } from "../models/pontos";
import { EditarPage } from "../editar/editar";
import { QuestionarioDTO } from "../models/questionario";
import { QuestionarioPage } from "../questionario/questionario";
import { ResgataPontuacaoPage } from "../resgata-pontuacao/resgata-pontuacao";
import { SocialSharing } from '@ionic-native/social-sharing';
import { UsuarioPontosDTO } from "../models/dadosPontuacao";
import { HistoricoPedidosPage } from "../historico-pedidos/historico-pedidos";
import { EditarDTO } from "../models/editar";

@Component({
  selector: "page-usuario",
  templateUrl: "usuario.html"
})
export class UsuarioPage {
  questionarios: any;

  //Informações que serão compatilhadas
  text: string = 'Pitaco: Responda algumas perguntas e ganhe recompensa';
  url: string = 'https://www.pitaco.com.br';

  /* questionarios: QuestionarioDTO = {
     id_questionario: 0,
     descricao_questionario: "",
     pontuacao_questionario: 0

   };*/

  usuario: CredenciaisDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    senha: "",
    nome: ""
  };

  pontuacao: string;


  usuarioPontos: UsuarioPontosDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    pontuacao: JSON.parse(localStorage.getItem("pontuacaoFinal"))
  };

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public servidor: ServidorProvider,
    private socialSharing: SocialSharing,
    public toast: ToastController

  ) { }


  //Sharing method in whatsapp
  shareWhatsapp() {

    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
      console.log("shareViaWhatsApp: Success");
      this.navCtrl.push(UsuarioPage);
    }).catch(e => {
      console.error("shareViaWhatsApp: failed");
    });
  }

  //Sharing method in Facebook
  shareFacebook() {

    this.socialSharing.shareViaFacebook(this.text, null, this.url).then(() => {
      console.log("shareViaFacebook: Success");

      this.navCtrl.push(UsuarioPage);
    }).catch(e => {
      console.error("shareViaFacebook: failed");
    });
  }

  //Sharing method in Email
  shareEmail() {
    this.socialSharing.shareViaEmail('Pitaco é o novo aplicativo para responder pesquisas do seu interesse e ainda obter prêmios. Junte-se a nós!', 'Pitaco: Compartilhe sua opnião e ganhe recompensa', ['']).then(() => {
      console.log("shareViaEmail: Success");
      this.navCtrl.push(UsuarioPage);
    }).catch(e => {
      console.error("shareViaEmail: failed");
    });
  }



  preferencias() {
    this.navCtrl.push(PreferenciasPage);
  }

  editar() {
    this.navCtrl.push(EditarPage);
  }

  historicoPedidos() {
    this.navCtrl.push(HistoricoPedidosPage);
  }

  resgataPontuacao() {
    var pts = parseInt(this.pontuacao, 10);
    console.log('pt2', pts);
    if (pts < 500) {
      this.toast
        .create({
          message: "Você não possui pontuação suficiente para realizar esta ação ",
          position: "botton",
          duration: 3000
        })
        .present();
    } else {
      this.navCtrl.push(ResgataPontuacaoPage);
    }
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
      .obterDadosUsuario(this.usuario.login_usuario)
      .subscribe(dadosPorUsuario => {
        this.usuario = dadosPorUsuario;
        console.log('dados',dadosPorUsuario);
        console.log('dados2',this.usuario.nome);
        localStorage.setItem("nome", JSON.stringify(dadosPorUsuario));
        
      });

    this.servidor
      .obterPontuacaoPorUsuario(this.usuario.login_usuario)
      .subscribe(pontuacaoPorUsuario => {
        this.pontuacao = JSON.stringify(pontuacaoPorUsuario);
        this.pontuacao = this.pontuacao.replace(/[\[\]PONTUACAO":{}]/g, "");
        localStorage.setItem("pontuacaoFinal", this.pontuacao);
        //this.pontuacao = JSON.parse(localStorage.getItem('pontuacao'))
        console.log("Data loo", this.usuario.login_usuario);
        console.log("Data loo", this.pontuacao);
      });

    this.servidor
      .buscarQuestionarios(this.usuario.login_usuario)
      .subscribe(questionarioPorUsuario => {
        console.log("obs", questionarioPorUsuario);
        this.questionarios = questionarioPorUsuario;

        if(questionarioPorUsuario.length == null || questionarioPorUsuario==0 ){
          
        }
      });


  }
  questionarioClick(
    questionarioDescricaoquestionario: string,
    questionarioIdquestionario: string,
    pontuacao_questionario: string
  ) {
    let alert = this.alertCtrl.create({
      title: "Atenção",
      subTitle:
        "Você vai iniciar o questionário " + questionarioDescricaoquestionario,
      message:
        "Responda com atenção, pois ele não poderá ser respondido novamente.",
      buttons: ["OK"]
    });
    alert.present();

    localStorage.setItem("questionario", questionarioIdquestionario);
    // localStorage.setItem( "descricao", questionarioDescricaoquestionario);
    localStorage.setItem(
      "descricao",
      JSON.stringify(questionarioDescricaoquestionario)
    );
    localStorage.setItem("pontuacaoQuestionario", pontuacao_questionario);

    console.log(
      "aqui",
      localStorage.setItem("questionario", questionarioIdquestionario)
    );
    // localStorage.setItem( "questionario",JSON.stringify(this.questionarios.id_questionario))
    // console.log("aqui",  localStorage.setItem( "questionario",JSON.stringify(this.questionarios.id_questionario)))
    this.navCtrl.setRoot(QuestionarioPage);
  }

  sair() {
    window.localStorage.removeItem("usuario");
    window.localStorage.removeItem("pontuacao");
    window.localStorage.removeItem("pontuacaoFinal");
    window.localStorage.removeItem("questionario");
    window.localStorage.removeItem("descricao");
    this.navCtrl.setRoot(HomePage);
  }
}
