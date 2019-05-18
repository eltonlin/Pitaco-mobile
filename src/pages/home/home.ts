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
  ) {
    //this.usuario = {};
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
