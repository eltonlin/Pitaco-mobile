import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { QuestionarioDTO } from '../models/questionario';
import { CredenciaisDTO } from '../models/credenciais';
import { UsuarioPage } from '../usuario/usuario';
import { RespostasDTO } from '../models/respostas';
import { HttpClientModule } from "@angular/common/http";
import { UsuarioPontosDTO } from '../models/dadosPontuacao';

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

  pergunta: QuestionarioDTO = {
    id_questionario: JSON.parse(localStorage.getItem("questionario")),
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    descricao_questionario: JSON.parse(localStorage.getItem("descricao")),
    pontuacao_questionario: JSON.parse(localStorage.getItem("pontuacaoQuestionario")),
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

  usuarioPontos: UsuarioPontosDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    pontuacao: JSON.parse(localStorage.getItem("pontuacaoFinal"))
  };


  constructor(public navCtrl: NavController, public toast: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public servidor: ServidorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionarioPage');

    this.servidor.exibirQuestionarios(this.pergunta.id_questionario).subscribe(questionarioPorId => {
      console.log('obs', questionarioPorId);
      this.questionarios = questionarioPorId;

      for (let i = 0; i < this.questionarios.length; i++) {
        for (let x = 0; x < this.questionarios[i].opcoes.length; x++) {
          this.questionarios[i].opcoes[x].checked = false;
        }
      }
    });

  }
  voltarQuestionarios(){
    this.navCtrl.setRoot(UsuarioPage);
  }

  radioChecked(opcoes, id) {
    for(let opcao of opcoes){
      if(opcao.id_opcao == id){
        opcao.checked = true;
      }
      else{
        opcao.checked = false;
      }
    }
  }

  salvarQuestionario() {
    this.pergunta.opcoes = new Array();

    let existeOpcaoMarcada = true;
    let foiMarcado = false;

    for (let i = 0; i < this.questionarios.length; i++) {
      if(existeOpcaoMarcada == false) {
        return this.toast
        .create({
          message: "Atenção: responda todas as perguntas ",
          position: "botton",
          duration: 3000
        })
        .present();
      }
      for (let x = 0; x < this.questionarios[i].opcoes.length; x++) {
        if (this.questionarios[i].opcoes[x].checked) {
          existeOpcaoMarcada = true;
          foiMarcado = true
          this.pergunta.opcoes.push(this.questionarios[i].opcoes[x].id_opcao);
        }
        else if(foiMarcado == false){
          existeOpcaoMarcada = false;
        }
      }
      foiMarcado = false;
    }

    if(existeOpcaoMarcada == false) {
      return this.toast
      .create({
        message: "Atenção: responda todas as perguntas ",
        position: "botton",
        duration: 3000
      })
      .present();
    }

    this.servidor.salvarQuestionario(this.pergunta).subscribe(
      data => {
        this.servidor.obterPontuacaoPorUsuario(this.pergunta.login_usuario).subscribe(
          pontuacao => {
            let usuario = {
              pontuacao : '',
              login_usuario: ''
            }
            console.log(pontuacao[0].PONTUACAO);
            usuario.pontuacao = pontuacao[0].PONTUACAO + this.pergunta.pontuacao_questionario;
            usuario.login_usuario = this.pergunta.login_usuario;
            console.log(usuario);

            //this.usuarioPontos.pontuacao = this.usuarioPontos.pontuacao + this.pergunta.pontuacao_questionario;
              
           
            console.log('aqui', this.usuarioPontos.pontuacao);
            console.log('aqui2', this.pergunta.pontuacao_questionario);
    
    
            this.servidor.atualizarPontuacao(usuario).subscribe(
              () => {
                this.navCtrl.setRoot(UsuarioPage);
                this.toast
                  .create({
                    message: "Obrigado, por responder este questionário. ",
                    position: "botton",
                    duration: 3000
                  })
                  .present();
              }
           )
          }
        )

      },
      error => {
        console.log(error);
        console.log(this.pergunta);
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

