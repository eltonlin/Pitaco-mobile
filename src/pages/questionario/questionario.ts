import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { QuestionarioDTO } from '../models/questionario';
import { CredenciaisDTO } from '../models/credenciais';
import { UsuarioPage } from '../usuario/usuario';
import { RespostasDTO } from '../models/respostas';

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
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    descricao_questionario: "",
    pontuacao_questionario: 0,
    tipo_pergunta: "",
    opcoes: new Array()
    /*opcoes: {
      descricao_opcao: "",
      id_opcao: "",
      id_pergunta: ""
    }*/
  };

  respostas: RespostasDTO = {
    usuario_final: JSON.parse(localStorage.getItem("usuario")), //localStorage.getItem('usuario'),
    respostas: new Array() //""
  };

  constructor(public navCtrl: NavController, public toast: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public servidor: ServidorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionarioPage');

    this.servidor.exibirQuestionarios(this.idQuestionario.id_questionario).subscribe(questionarioPorId => {
      console.log('obs', questionarioPorId);
      this.questionarios = questionarioPorId;

      for (let i = 0; i < this.questionarios.length; i++) {
        for (let x = 0; x < this.questionarios[i].opcoes; x++) {
          this.questionarios[i].opcoes[x].checked = false;
        }
      }
      console.log('olhar ', this.questionarios)
    });

  }
  voltarQuestionarios(){
    this.navCtrl.setRoot(UsuarioPage);
  }

  salvarQuestionario() {
    this.idQuestionario.opcoes = new Array();
    for (let i = 0; i < this.questionarios.length; i++) {
      console.log('olhar for1', this.questionarios);
      for (let x = 0; x < this.questionarios[i].opcoes.length; x++) {
        console.log('olhar for2', this.questionarios);
        if (this.questionarios[i].opcoes[x].checked) {
          this.idQuestionario.opcoes.push(this.questionarios[i].opcoes[x].id_opcao);
          console.log('if', this.questionarios[i].opcoes[x].checked)
        } 
        if(this.questionarios[i].opcoes[x].id_opcao == null ){
          return this.toast
          .create({
            message: "É necessário ter ao menos uma opção marcada para cada pergunta ",
            position: "botton",
            duration: 3000
          })
          .present();
        }
      }
    }
   
    if (this.idQuestionario.opcoes.length == 0  ) {
      return this.toast
        .create({
          message: "Atenção: responda todas as perguntas ",
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
            message: "Obrigado, por responder este questionário. ",
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


