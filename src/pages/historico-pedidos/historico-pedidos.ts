import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { HistoricoPedidosDTO } from '../models/historico';

/**
 * Generated class for the HistoricoPedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-pedidos',
  templateUrl: 'historico-pedidos.html',
})

export class HistoricoPedidosPage {
  pedidos: any;

  historico: HistoricoPedidosDTO = {
    usuario_final: JSON.parse(localStorage.getItem("usuario")),
    banco: "",
    agencia: "",
    conta: "",
    valor: 0,
    pago: "",
    data_pagamento: "",
    data_solicitacao: ""
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servidor: ServidorProvider,
    public alertCtrl: AlertController,
    public toast: ToastController, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoPedidosPage');

    this.servidor.exibirHistoricoPedidos(this.historico.usuario_final).subscribe(historicoPedido => {
      console.log('history', historicoPedido);
      this.pedidos = historicoPedido;
      console.log('dados', this.historico.agencia)
    });
  }

}
