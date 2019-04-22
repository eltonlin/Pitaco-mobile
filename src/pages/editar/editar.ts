
import { CadastroDTO } from '../models/dadosUsuario';
import { Component, ɵConsole } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Item, ModalController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { UsuarioPage } from '../usuario/usuario';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CredenciaisDTO } from '../models/credenciais';
import { EditarDTO } from '../models/editar';
import { EnderecoDTO } from '../models/local';

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-editar",
  templateUrl: "editar.html"
})
export class EditarPage {
  form: FormGroup;

  /* usuario: CredenciaisDTO = {
     login_usuario: JSON.parse(localStorage.getItem('usuario')),
     senha: ""
   };*/

  // usuario  = JSON.parse(localStorage.getItem('usuario'))
  usuario: EditarDTO = {
    login_usuario: JSON.parse(localStorage.getItem("usuario")),
    nome: "",
    cpf: "",
    faixa_salarial: "",
    data_nascimento: "",
    endereco: {
      login_usuario: "",
      rua: "",
      complemento: "",
      bairro: "",
      cidade: "",
      cep: "",
      estado: ""
    }
  };

  /*endereco: EnderecoDTO = {
    login_usuario:  JSON.parse(localStorage.getItem('usuario')),
    rua: "",
    complemento: "",
    bairro: "",
    cidade: "",
    cep: "",
    estado: ""
  }*/
  constructor(public navCtrl: NavController, public navParams: NavParams, public servidor: ServidorProvider,
    public alertCtrl: AlertController, public toast: ToastController, public formBuilder: FormBuilder) {
    this.createForm();
  }

  ionViewDidLoad() {
    this.servidor
      .obterDadosUsuario(this.usuario.login_usuario)
      .subscribe(dadosPorUsuario => {
        console.log(dadosPorUsuario);

        this.form.get("nome").setValue(dadosPorUsuario.nome);
        this.form.get("cpf").setValue(dadosPorUsuario.cpf);
        this.form.get("rua").setValue(dadosPorUsuario.endereco[0].rua);
        this.form.get("complemento").setValue(dadosPorUsuario.endereco[0].complemento);
        this.form.get("bairro").setValue(dadosPorUsuario.endereco[0].bairro);
        this.form.get("cidade").setValue(dadosPorUsuario.endereco[0].cidade);
        this.form.get("estado").setValue(dadosPorUsuario.endereco[0].estado);
        this.form.get("cep").setValue(dadosPorUsuario.endereco[0].cep);
        this.form.get("opcao").setValue(dadosPorUsuario.faixa_salarial);
        this.form.get("faixa_salarial").setValue(dadosPorUsuario.faixa_salarial);
        this.form.get("data_nascimento").setValue(dadosPorUsuario.data_nascimento);
        this.usuario.data_nascimento = dadosPorUsuario.data_nascimento;
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      rua: [, Validators.required],
      nome: ["", [Validators.required]],
      complemento: ["", [Validators.required]],
      bairro: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cep: ["", [Validators.required]],
      opcao: ["", [Validators.required]],
      faixa_salarial : ["", [Validators.required] ] ,
      data_nascimento : ["", [Validators.required]],
      cpf: [
        "",
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11)
        ]
      ]
    });
  }

  get rua() {
    return this.form.get("rua");
  }
  get complemento() {
    return this.form.get("complemento");
  }
  get bairro() {
    return this.form.get("bairro");
  }
  get cidade() {
    return this.form.get("cidade");
  }
  get estado() {
    return this.form.get("estado");
  }
  get cep() {
    return this.form.get("cep");
  }
  get nome() {
    return this.form.get("nome");
  }
  get faixa_salarial() {
    return this.form.get("faixa_salarial");
  }
  get data_nascimento() {
    return this.form.get("data_nascimento");
  }
  get cpf() {
    return this.form.get("cpf");
  }

  editarUsuario() {
    let user = {usuario : this.usuario} 
    this.servidor.atualizarUsuario(user).subscribe(
      () => {
        this.navCtrl.setRoot(UsuarioPage);
        this.toast
          .create({
            message: "Usuário atualizado com Sucesso ",
            position: "botton",
            duration: 3000
          })
          .present();
      },
      error => {
        console.log(error);
        this.toast
          .create({
            message:
              "Erro ao realizar atualização cadastral. Erro: " +
              error.error.message,
            position: "botton",
            duration: 3000
          })
          .present();
      }
    );
  }
}
