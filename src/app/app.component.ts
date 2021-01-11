import { Component, OnInit } from '@angular/core';

import { ClientParams } from './ClientParams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SCCBD-Client';

  async ngOnInit() {    
    const clientParams = ClientParams.getInstance();

    //INITIALIZATIONS
    clientParams.setIP("http://localhost");
    clientParams.setPort(3000);
    clientParams.setTTPip("http://localhost");
    clientParams.setTTPport(5000);

    clientParams.setAESkey("edead000b97a69c30ef7cd357fe46c1af00bf079b9e0fb7729f163ec19c72ee5"); //AES 256 bits PRIVATE KEY
  }

}