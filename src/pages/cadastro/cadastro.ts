import { Component, ɵConsole } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Item, ModalController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { UsuarioPage } from '../usuario/usuario';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { registerModuleFactory } from '@angular/core/src/linker/ng_module_factory_loader';
import { PreferenciasPage } from '../preferencias/preferencias';
import { CredenciaisDTO } from '../models/credenciais';
import { CadastroDTO } from '../models/dadosUsuario';
import { Body } from '@angular/http/src/body';


/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  form: FormGroup;
  // usuario_dados: any = [];
  isTextFieldType: boolean;

  usuario: CredenciaisDTO = {
    login_usuario: JSON.parse(localStorage.getItem('usuario')),
    senha: ""
  };

  // usuario  = JSON.parse(localStorage.getItem('usuario'))
  usuario_dados: CadastroDTO = {
    login_usuario: "",
    nome: "",
    senha: "",
    confirma_senha: "",
    cpf: "",
    faixa_salarial: "",
    data_nascimento: "",
    rua:  "",
    complemento: "",
    bairro: "",
    cidade: "",
    cep: "",
    estado: ""
  };





  constructor(public navCtrl: NavController, public navParams: NavParams, public servidor: ServidorProvider,
    public alertCtrl: AlertController, public toast: ToastController, public formBuilder: FormBuilder) {
    //this.usuario_dados = {};


    this.createForm();


    /*let dadosParam = this.navParams.get("usuario_dados")
      if (dadosParam != null) {
        this.usuario = dadosParam;
      }*/


  }


  ionViewDidLoad() {

  }
       


  createForm() {


    this.form = this.formBuilder.group({
      email: ['', [Validators.email]],
      rua: [, Validators.required],
      nome: ['', [Validators.required]],
      texto: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      opcao: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      confirma_senha: ['', [Validators.required]],
    }, { validator: this.validarSenhas('senha', 'confirma_senha') });

  }



  get email() { return this.form.get('email'); }
  get rua() { return this.form.get('rua'); }
  get complemento() { return this.form.get('complemento'); }
  get bairro() { return this.form.get('bairro'); }
  get cidade() { return this.form.get('cidade'); }
  get estado() { return this.form.get('estado'); }
  get cep() { return this.form.get('cep'); }
  get nome() { return this.form.get('nome'); }
  get texto() { return this.form.get('texto'); }
  get senha() { return this.form.get('senha'); }
  get confirma_senha() { return this.form.get('confirma_senha'); }
  get opcao() { return this.form.get('opcao'); }
  get cpf() { return this.form.get('cpf'); }




  validarSenhas(senhaKey: string, confirma_senhaKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let senha = group.controls[senhaKey];
      let confirma_senha = group.controls[confirma_senhaKey];

      if (senha.value !== confirma_senha.value) {
        return {
          validarSenhas: true
        };
      }
    }
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }


  salvarUsuario() {
      this.servidor.salvarUsuario(this.usuario).subscribe(
        data => {
          localStorage.setItem("usuario", JSON.stringify(this.usuario.login_usuario));
          // localStorage.setItem("usuario", JSON.stringify(this.usuario));
          this.navCtrl.setRoot(PreferenciasPage);
          this.toast.create({
            message: 'Cadastro Realizado com Sucesso ', position: 'botton', duration: 3000
          }).present();
        }, error => {
          console.log(error);
          this.toast.create({
            message: "Erro ao realizar cadastro. Erro: " + error.error.message, position: 'botton', duration: 3000
          }).present();
        })
    }

  
}






