import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { CriptoService } from 'src/app/services/cripto/cripto.service';
import keys from "src/keys";

@Component({
  selector: 'app-cripto',
  templateUrl: './cripto.component.html',
  styleUrls: ['./cripto.component.css']
})
export class CriptoComponent implements OnInit {

  //GET
  RXciphertext: string;
  RXiv: string;
  decryption: string; //Received ciphertext after being decrypted by the Client
  
  //POST
  criptoForm = new FormGroup ({
    plaintextInput: new FormControl()
  });
  TXciphertext: string;
  TXiv: string;
  RXplaintext;  //Received ciphertext decrypted by the Server

  constructor(
    private criptoService: CriptoService
  ) { }

  ngOnInit(): void {
    this.RXciphertext = 'Ciphertext Received from Server';
    this.RXiv = 'IV Received from Server';
    this.decryption = 'Decryption Result';

    this.TXciphertext = 'Encrypted Text';
    this.TXiv = 'Generated IV';
    this.RXplaintext = 'Plaintext decrypted in Server';
  }

  public getCipherText(){ //AES, 256 bits key, CTR mode, 128 bits IV
    this.criptoService.getCipherText()
    .subscribe(res => {
      console.log(res);

      this.RXciphertext = res.ciphertxt as string;
      this.RXiv = res.iv as string;
      this.decryption = CryptoJS.AES.decrypt(this.RXciphertext, keys.AES256.toString(), {iv: res.iv, mode: CryptoJS.mode.CTR}).toString(CryptoJS.enc.Utf8);
    });
  }

  public encrypt(){ //AES, 256 bits key, CTR mode, 128 bits IV
    let Plaintxt: string = this.criptoForm.get('plaintextInput').value;
    
    let IV = CryptoJS.lib.WordArray.random(128/8); //128 bits IV
    this.TXiv = IV.toString();

    let Ciphertxt: string = CryptoJS.AES.encrypt(Plaintxt, keys.AES256.toString(), {iv: IV, mode:CryptoJS.mode.CTR}).toString();
    this.TXciphertext = Ciphertxt;
  }

  public getPlainText(){ 
    this.criptoService.getPlainText(this.TXciphertext, this.TXiv)
    .subscribe(res => {
      console.log(res);

      this.RXplaintext = res.plaintxt as string;
    });
  }


}
