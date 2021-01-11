import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientParams } from 'src/app/ClientParams';

import * as bigintConversion from 'bigint-conversion';

@Injectable({
  providedIn: 'root'
})
export class KeyExchangeService {

  router = `keyExchange`;

  constructor(
    private http: HttpClient
  ) { }

  serverKeyExchange(ttpFlag: boolean): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'ttpFlag': ttpFlag,
      'e': bigintConversion.bigintToHex(clientParams.getRSAkpub().e),
      'n': bigintConversion.bigintToHex(clientParams.getRSAkpub().n)
    }
    const path: string = `${clientParams.getIP()}:${clientParams.getPort()}/${this.router}`;
    return this.http.post<any>(path, req);
  }

  ttpKeyExchange(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'e': bigintConversion.bigintToHex(clientParams.getRSAkpub().e),
      'n': bigintConversion.bigintToHex(clientParams.getRSAkpub().n)
    }
    const path: string = `${clientParams.getTTPip()}:${clientParams.getTTPport()}/${this.router}/client`;
    return this.http.post<any>(path, req);
  }
  
}
