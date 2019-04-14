import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioPage } from '../pages/usuario/usuario';
import { HttpModule } from '@angular/http';
import { ServidorProvider } from '../providers/servidor/servidor';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { PreferenciasPage } from '../pages/preferencias/preferencias';
import { BrMaskerModule } from 'brmasker-ionic-3';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsuarioPage,
    CadastroPage,
    PreferenciasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsuarioPage,
    CadastroPage,
    PreferenciasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServidorProvider

  ]
})
export class AppModule { }
