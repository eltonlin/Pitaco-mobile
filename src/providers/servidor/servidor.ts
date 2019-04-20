import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { CredenciaisDTO } from "../../pages/models/credenciais";

@Injectable()
export class ServidorProvider {
  url = "http://localhost:3000";

  constructor(public http: HttpClient) {
    console.log("Hello ServidorProvider Provider");
  }

  salvarUsuario(obj): Observable<any> {
    return this.http
      .post(this.url + "/usuario_final/cadastrar_login", obj)
      .map(res => res);
  }

  salvarPreferencias(obj): Observable<any> {
    return this.http
      .post(this.url + "/usuario_final_interesses/cadastrar", obj)
      .map(res => res);
  }

  obterPreferencias(): Observable<any> {
    return this.http.get(this.url + "/interesses").map(res => res);
  }

  obterPontuacaoPorUsuario(usuario: String): Observable<any> {
    return this.http.get(
      this.url + `/usuario_final/` + `${usuario}` + `/pontuacao`
    );
  }

  obterPreferenciasPorUsuario(usuario: String): Observable<any> {
    return this.http.get(this.url + `/usuario_final_interesses/${usuario}`);
  }

  logar(usuario: CredenciaisDTO): Observable<any> {
    return this.http
      .post(this.url + "/usuario_final/login", usuario)
      .map(res => res);
  }

  deletarInteressePorUsuario(obj): Observable<any> {
    return this.http.post(this.url + "/usuario_final_interesses/deletar", obj);
  }
}
