import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoPedidosPage } from './historico-pedidos';

@NgModule({
  declarations: [
    HistoricoPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoPedidosPage),
  ],
})
export class HistoricoPedidosPageModule {}
