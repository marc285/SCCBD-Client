import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientParams } from 'src/app/ClientParams';

import * as bigintConversion from 'bigint-conversion';

@Injectable({
  providedIn: 'root'
})
export class BsService {

  router = `bs`;

  constructor(
    private http: HttpClient
  ) { }

  getSigned(blindedMessage: bigint): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      'bm': bigintConversion.bigintToHex(blindedMessage)
    }
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/${this.router}/getSigned`;
    return this.http.post<any>(path, req);
  }
}
