import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Item } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { UsuarioPage } from '../usuario/usuario';
import { isTrueProperty } from 'ionic-angular/umd/util/util';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { registerModuleFactory } from '@angular/core/src/linker/ng_module_factory_loader';


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
  usuario: any;
  isTextFieldType: boolean;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public servidor: ServidorProvider,
    public alertCtrl: AlertController, public toast: ToastController, public formBuilder: FormBuilder) {
    this.usuario = {};

    this.createForm();



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email]],
      rua: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      opcao: ['', [Validators.required]],
      texto: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      confirma_senha: ['', [Validators.required]],      
    }, {validator: this.validarSenhas('senha', 'confirma_senha')}); 
  }

  get email() { return this.form.get('email'); }
  get rua() { return this.form.get('rua'); }
  get complemento() { return this.form.get('complemento'); }
  get bairro() { return this.form.get('bairro'); }
  get cidade() { return this.form.get('cidade'); }
  get estado() { return this.form.get('estado'); }
  get cep() { return this.form.get('cep'); }
  get texto() { return this.form.get('texto'); }
  get senha() { return this.form.get('senha'); }
  get confirma_senha() { return this.form.get('confirma_senha'); }
  get opcao() { return this.form.get('opcao'); }
  get cpf() { return this.form.get('cpf'); }


  validarSenhas(senhaKey: string, confirma_senhaKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
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
    if (this.form.valid) {
      this.servidor.salvarUsuario(this.usuario).subscribe(item => {
        this.navCtrl.setRoot(UsuarioPage);
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

}




