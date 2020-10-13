import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  serverIP: string = "localhost";
  serverPort: number = 3000;

  textRoute: string = `http://${this.serverIP}:${this.serverPort}/txt`;

  constructor(
    private http: HttpClient
  ) { }

  postText(text: string): Observable<any> {
    let req = { 
      "txt": text 
    };
    const path: string = `${this.textRoute}/post`;
    return this.http.post<any>(path, req);
  }

  getText(): Observable<any> {
    const path: string = `${this.textRoute}/get`;
    return this.http.get<any>(path);
  }
}
