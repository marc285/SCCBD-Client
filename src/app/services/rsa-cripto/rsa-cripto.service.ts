import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientParams } from 'src/app/ClientParams';

import * as bigintConversion from 'bigint-conversion';

@Injectable({
  providedIn: 'root'
})
export class RSACriptoService {

  router = `cripto/RSA`;

  constructor(
    private http: HttpClient
  ) { }

  getCipherText(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `${clientParams.getIP()}:${clientParams.getPort()}/${this.router}/getEncrypted`;
    return this.http.get<any>(path);
  }

  getPlainText(cipherText: bigint): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'c': bigintConversion.bigintToHex(cipherText)
    }
    const path: string = `${clientParams.getIP()}:${clientParams.getPort()}/${this.router}/decrypt`;
    return this.http.post<any>(path, req);
  }

  getSignature(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `${clientParams.getIP()}:${clientParams.getPort()}/${this.router}/getSigned`;
    return this.http.get<any>(path);
  }

  getVerification(signature: bigint): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      's': bigintConversion.bigintToHex(signature)
    }
    const path: string = `${clientParams.getIP()}:${clientParams.getPort()}/${this.router}/verify`;
    return this.http.post<any>(path, req);
  }
}
