import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientParams } from 'src/app/ClientParams';

import * as bigintConversion from 'bigint-conversion';

@Injectable({
  providedIn: 'root'
})
export class RSACriptoService {

  constructor(
    private http: HttpClient
  ) { }

  keyExchange(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'e': bigintConversion.bigintToHex(clientParams.getRSAkpub().e),
      'n': bigintConversion.bigintToHex(clientParams.getRSAkpub().n)
    }
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/cripto/RSAkeyExchange`;
    return this.http.post<any>(path, req);
  }

  getCipherText(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/cripto/RSAgetEncrypted`;
    return this.http.get<any>(path);
  }

  getPlainText(cipherText: bigint): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'c': bigintConversion.bigintToHex(cipherText),
    }
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/cripto/RSAdecrypt`;
    return this.http.post<any>(path, req);
  }

  getSignature(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/cripto/RSAgetSigned`;
    return this.http.get<any>(path);
  }

  getVerification(signature: bigint): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      's': bigintConversion.bigintToHex(signature)
    }
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/criptoRSAverify`;
    return this.http.post<any>(path, req);
  }
}
