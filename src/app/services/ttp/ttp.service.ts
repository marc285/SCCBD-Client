import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientParams } from 'src/app/ClientParams';

@Injectable({
  providedIn: 'root'
})
export class TtpService {

  router = `ttp`;

  constructor(
    private http: HttpClient
  ) { }

  getContent(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `${clientParams.getIP()}:${clientParams.getPort()}/${this.router}/getContent`;
    return this.http.get<any>(path);
  }

  sendInterest(objectT2: object): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'obj': objectT2
    };
    const path: string = `${clientParams.getIP()}:${clientParams.getPort()}/${this.router}/sendInterest`;
    return this.http.post<any>(path, req);
  } 

  getKey(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `${clientParams.getTTPip()}:${clientParams.getTTPport()}/${this.router}/getKey`;
    return this.http.get<any>(path);
  }

}
