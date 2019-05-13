import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ResgataPontuacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-resgata-pontuacao",
  templateUrl: "resgata-pontuacao.html"
})
export class ResgataPontuacaoPage {
  pontuacao: any = parseInt(localStorage.getItem("pontuacao"));

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("pontuacao", this.pontuacao);
  }
}
