import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {

  serverIP: string = "localhost";
  serverPort: number = 3000;

  criptoRoute: string = `http://${this.serverIP}:${this.serverPort}/cripto`;

  constructor(
    private http: HttpClient
  ) { }

  getCipherText(): Observable<any> {
    const path: string = `${this.criptoRoute}/encrypt`;
    return this.http.get<any>(path);
  }

  getPlainText(Ciphertext: string, IV:String): Observable<any> {
    let req = {
      'ciphertxt': Ciphertext,
      'iv': IV
    }
    const path: string = `${this.criptoRoute}/decrypt`;
    return this.http.post<any>(path, req);
  }
}
