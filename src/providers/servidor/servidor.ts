import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { CredenciaisDTO } from "../../pages/models/credenciais";

@Injectable()
export class ServidorProvider {
  //url = "http://localhost:3000";
  url = "http://fast-ocean-23649.herokuapp.com";

  constructor(public http: HttpClient) {
    console.log("Hello ServidorProvider Provider");
  }

  salvarUsuario(obj): Observable<any> {
    return this.http
      .post(this.url + "/usuario_final/cadastrar_login", obj)
      .map(res => res);
  }
  buscaCep(cep: String): Observable<any> {
    return this.http
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .map(res => res);
  }

  atualizarUsuario(obj): Observable<any> {
    return this.http
      .put(this.url + "/usuario_final/atualizar", obj)
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

  buscarQuestionarios(usuario: String): Observable<any> {
    return this.http
      .get(this.url + `/questionario/usuario/${usuario}`)
      .map(res => res);
  }

  exibirQuestionarios(id_questionario: String): Observable<any> {
    return this.http
      .get(this.url + `/pergunta/${id_questionario}`)
      .map(res => res);
  }

  salvarQuestionario(obj): Observable<any> {
    return this.http.post(this.url + "/resposta", obj).map(res => res);
  }
  exibirHistoricoPedidos(usuario: String): Observable<any> {
    return this.http
    .get(this.url + `/solicita_pagamento/${usuario}`)
    .map(res => res);
  }
  obterDadosUsuario(usuario: String): Observable<any> {
    return this.http
      .get(this.url + `/usuario_final/${usuario}`)
      .map(res => res);
  }

  obterPontuacaoPorUsuario(usuario: String): Observable<any> {
    return this.http.get(
      this.url + `/usuario_final/` + `${usuario}` + `/pontuacao`
    );
  }

  atualizarPontuacao(obj): Observable<any> {
    return this.http.put(this.url + `/usuario_final/atualizar_pontuacao`, obj)
  }

  resgatarPontos(obj): Observable<any> {
    return this.http.post(this.url + "/solicita_pagamento/cadastrar", obj);
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
