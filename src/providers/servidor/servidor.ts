
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ServidorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServidorProvider {

  url  =  "http://localhost:3000/usuario_final"

  

  constructor(public http: Http) {
    console.log('Hello ServidorProvider Provider');
  }

  list(){
    return this.http.get(this.url).pipe(map(res => res.json()))
  }

  salvarUsuario(obj){
    return this.http.post(this.url, obj).map(res => res.json());
  }
}
