import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientParams } from 'src/app/ClientParams';

@Injectable({
  providedIn: 'root'
})
export class AESCriptoService {

  constructor(
    private http: HttpClient
  ) { }

  getCipherText(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/cripto/AESgetEncrypted`;
    return this.http.get<any>(path);
  }

  getPlainText(cipherText: string, IV: String): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'c': cipherText,
      'iv': IV
    }
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/cripto/AESdecrypt`;
    return this.http.post<any>(path, req);
  }
}