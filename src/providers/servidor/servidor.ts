
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredenciaisDTO } from '../../pages/models/credenciais';
import { LocalUser } from '../../pages/models/local_user';
import { StorageService } from './storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { throwStatement, stringLiteral } from 'babel-types';
import { JwtHelper } from 'angular2-jwt';


/*
  Generated class for the ServidorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServidorProvider {

  jwtHelper: JwtHelper = new JwtHelper();

  url = "http://localhost:3000"



  constructor(public http: HttpClient, public storage: StorageService) {
    console.log('Hello ServidorProvider Provider');
  }

  list() {
    return this.http.get(this.url + "/usuario_final/login").map(res => res);
  }

  salvarUsuario(obj) {
    return this.http.post(this.url + "/usuario_final/cadastrar_login", obj).map(res => res);
  }

  definirPreferencias(obj){
    return this.http.post(this.url + "/interesses", obj).map(res => res);
  }
  

  logar(usuario: CredenciaisDTO) {
    return this.http.post(this.url + "/usuario_final/login", usuario, {
      observe: 'response',
      responseType: 'text'
    })

  }

  sucessoLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7); 
    let user: LocalUser = {
     token: tok,
     login_usuario: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
  } 

  logout() {
    this.storage.setLocalUser(null);
  }

}