
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UsuarioPage } from '../../pages/usuario/usuario';

/*
  Generated class for the ServidorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServidorProvider {

  url  =  "http://localhost:3000"

  

  constructor(public http: Http) {
    console.log('Hello ServidorProvider Provider');
  }

  list(){
    return this.http.get(this.url + "/usuario_final/login").pipe(map(res => res.json()))
  }

  salvarUsuario(obj){
    return this.http.post(this.url + "/usuario_final/cadastrar_login", obj).map(res => res.json());
  }

  logar(obj){
    return this.http.post(this.url + "/usuario_final/login", obj).map(res => res.json());
  }

}
