import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { UsuarioPage } from '../usuario/usuario';
import { isTrueProperty } from 'ionic-angular/umd/util/util';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


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
      opcao: ['', [Validators.required]],
      texto: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]]
    });
  }

  get email() { return this.form.get('email'); }
  get texto() { return this.form.get('texto'); }
  get senha() { return this.form.get('senha'); }
  get opcao() { return this.form.get('opcao'); }
  get cpf() { return this.form.get('cpf'); }


  salvarUsuario() {
    if (this.form.valid) {
      this.servidor.salvarUsuario(this.usuario).subscribe(item => {
        this.navCtrl.push(UsuarioPage);
        this.toast.create({
          message: "Cadastro Realizado com Sucesso"
        }).present();
      }, error => {
        this.toast.create({
          message: "Erro ao realizar cadastro"
        }).present();
      })

    }
  }
}

