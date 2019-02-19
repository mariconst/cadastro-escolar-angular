import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudantes } from '../interfaces/estudantes';
import { map } from 'rxjs/operators';
import { EstadosBr } from '../interfaces/estadosbr';



@Injectable({
  providedIn: 'root'
})
export class EstudantesService {

  //LINK DA API QUE FORNECERÁ OS DADOS
  API_ENDPOINT = "http://192.168.10.10";
  constructor(private httpCliente: HttpClient) { }

  estudantes: Estudantes[];

  get(){
    return this.httpCliente.get<Estudantes[]>(this.API_ENDPOINT + '/estudantes');
  }

  getOne(id){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
   
    return this.httpCliente.get<Estudantes[]>(this.API_ENDPOINT + '/estudantes/' + id);
  }

  getCEP(cep){
    return this.httpCliente.get(`https://api.postmon.com.br/v1/cep/${cep}`);
  }

  getEstadosBr(){
    return this.httpCliente.get<EstadosBr[]>('assets/dados/estadosbr.json');
  }

  save(form){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(JSON.stringify(form.value));
    return this.httpCliente.post(this.API_ENDPOINT + '/estudantes', JSON.stringify(form.value), {headers:headers});
  }

  update(form, id){
    console.log(id);
    return this.httpCliente.put(this.API_ENDPOINT + '/estudantes', JSON.stringify(form.value), id );
  }

  delete(id){
    return this.httpCliente.delete(`${this.API_ENDPOINT}/estudantes/${id}`);
  }
}
