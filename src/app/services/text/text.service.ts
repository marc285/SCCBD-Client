import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientParams } from 'src/app/ClientParams';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(
    private http: HttpClient
  ) { }

  postText(text: string): Observable<any> {
    const clientParams = ClientParams.getInstance();
    let req = {
      "txt": text
    };
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/txt/post`;
    return this.http.post<any>(path, req);
  }

  getText(): Observable<any> {
    const clientParams = ClientParams.getInstance();
    const path: string = `http://${clientParams.getIP()}:${clientParams.getPort()}/txt/get`;
    return this.http.get<any>(path);
  }
}
