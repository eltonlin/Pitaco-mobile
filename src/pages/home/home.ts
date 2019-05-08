import { CadastroPage } from "./../cadastro/cadastro";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { Http } from "@angular/http";
import { ServidorProvider } from "../../providers/servidor/servidor";
import { UsuarioPage } from "../usuario/usuario";
import { CredenciaisDTO } from "../models/credenciais";
import { Storage } from "@ionic/storage";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  //usuario: any;
  user: any = {};
  isTextFieldType: boolean;
  //login_usuario: string;
  // senha: string;

  usuario: CredenciaisDTO = {
    login_usuario: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    public servidor: ServidorProvider,
    public http: Http,
    public toast: ToastController,
    private fb: Facebook
  ) {
    //this.usuario = {};
  }

  loginFb() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res.status === 'connected') {
          this.user.img = 'https://graph.facebook.com/' + res.authResponse.userID + '/picture?type=square';
          this.getData(res.authResponse.accessToken);
          this.navCtrl.setRoot(UsuarioPage);
        } else {
          alert('Login failed');
        }
        console.log('Logged into Facebook!', res)
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getData(access_token: string) {
    let url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=' + access_token;
    this.http.get(url).subscribe(data => {
        this.usuario.login_usuario = JSON.stringify(data);
      localStorage.setItem("usuario", JSON.stringify(data));
    });
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  goToCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  logar() {
    if (
      this.usuario.login_usuario == undefined ||
      this.usuario.senha == undefined
    ) {
      let alert = this.alertCtrl.create({
        title: "Atenção",
        message: "Preencha todos os campos!",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      // return new Promise((resolve, reject) => {
      this.servidor.logar(this.usuario).subscribe(
        response => {
          //localStorage.setItem("usuario", this.usuario.login_usuario);
          localStorage.setItem(
            "usuario",
            JSON.stringify(this.usuario.login_usuario)
          );
          this.navCtrl.setRoot(UsuarioPage);
        },
        error => {
          this.toast
            .create({
              message:
                "Erro ao realizar cadastro. Erro: " + error.error.message,
              position: "botton",
              duration: 3000
            })
            .present();
        }
      );
      //});
    }
  }
}
