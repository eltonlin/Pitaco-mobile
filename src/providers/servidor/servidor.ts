
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CredenciaisDTO } from '../../pages/models/credenciais';



/*
  Generated class for the ServidorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServidorProvider {


  url = "http://localhost:3000"



  constructor(public http: HttpClient) {
    console.log('Hello ServidorProvider Provider');
  }


  salvarUsuario(obj): Observable<any> {
    return this.http.post(this.url + "/usuario_final/cadastrar_login", obj).map(res => res);
  }

  salvarPreferencias(obj): Observable<any> {
    return this.http.post(this.url + "/usuario_final_interesses/cadastrar", obj).map(res => res);
  }
  
  obterPreferencias(){
    return this.http.get(this.url + "/interesses").map(res => res);
  }

  logar(usuario: CredenciaisDTO): Observable<any> {
    return this.http.post(this.url + "/usuario_final/login", usuario).map(res => res);

  }

}