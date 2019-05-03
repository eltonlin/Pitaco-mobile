import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { QuestionarioDTO } from '../models/questionario';
import { CredenciaisDTO } from '../models/credenciais';
import { UsuarioPage } from '../usuario/usuario';

/**
 * Generated class for the QuestionarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionario',
  templateUrl: 'questionario.html',
})
export class QuestionarioPage {
  questionarios: any;

  idQuestionario: QuestionarioDTO = {
    id_questionario: JSON.parse(localStorage.getItem("questionario")),
    login_usuario:  JSON.parse(localStorage.getItem("usuario")),
    descricao_questionario: "",
    pontuacao_questionario: 0,
    tipo_pergunta: "",
    opcoes: new Array()
  };

  /*usuario: CredenciaisDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    senha: ""
  };*/

  constructor(public navCtrl: NavController, public toast: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public servidor: ServidorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionarioPage');

    this.servidor.exibirQuestionarios(this.idQuestionario.id_questionario).subscribe(questionarioPorId => {
      console.log('obs', questionarioPorId);
      this.questionarios = questionarioPorId;

    });

  }

  salvarQuestionario() {
    this.idQuestionario.opcoes = new Array();
    console.log(this.idQuestionario.opcoes)
    for (let i = 0; i < this.questionarios.length; i++) {
        console.log('olhar for', this.idQuestionario.opcoes);
    
      if (this.questionarios[i].checked) {
        this.idQuestionario.opcoes.push(this.questionarios[i].opcoes[0].id_opcao);
      }
    }
    if (this.idQuestionario.opcoes.length == 0) {
      return this.toast
        .create({
          message: "É necessário ter ao menos uma opção marcada ",
          position: "botton",
          duration: 3000
        })
        .present();
    }

    this.servidor.salvarQuestionario(this.idQuestionario).subscribe(
      data => {
        this.navCtrl.setRoot(UsuarioPage);
        this.toast
          .create({
            message: "Obrigado,por responder este questionário. ",
            position: "botton",
            duration: 3000
          })
          .present();
      },
      error => {
        console.log(error);
        console.log(this.idQuestionario);
        this.toast
          .create({
            message: "Erro ao responder questionário. Erro: " + error.error.message,
            position: "botton",
            duration: 3000
          })
          .present();
      }
    );
  }
}


