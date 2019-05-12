import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { UsuarioPage } from "../pages/usuario/usuario";
import { HttpModule } from "@angular/http";
import { ServidorProvider } from "../providers/servidor/servidor";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { PreferenciasPage } from "../pages/preferencias/preferencias";
import { EditarPage } from "../pages/editar/editar";
import { QuestionarioPage } from "../pages/questionario/questionario";
<<<<<<< HEAD
import { BrMaskerModule } from "brmasker-ionic-3";
=======

>>>>>>> a3d612f739bda9b72b995f7ede933f4567fc0175

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsuarioPage,
    CadastroPage,
    PreferenciasPage,
    EditarPage,
    QuestionarioPage
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
    PreferenciasPage,
    EditarPage,
    QuestionarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServidorProvider
  ]
})
export class AppModule {}
