import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { ClientParams } from 'src/app/ClientParams';

import { AESCriptoService } from 'src/app/services/aes-cripto/aes-cripto.service';

@Component({
  selector: 'app-aes-cripto',
  templateUrl: './aes-cripto.component.html',
  styleUrls: ['./aes-cripto.component.css']
})
export class AESCriptoComponent implements OnInit {

  //GET
  RXciphertext: string;
  RXiv: string;
  decryption: string; //Received ciphertext after being decrypted by the Client

  //POST
  criptoForm = new FormGroup({
    plainTextInput: new FormControl()
  });
  TXciphertext: string;
  TXiv: string;
  RXplaintext: string;  //Received ciphertext decrypted by the Server

  constructor(
    private aesCriptoService: AESCriptoService
  ) {
    this.RXciphertext = 'Ciphertext Received from Server';
    this.RXiv = 'IV Received from Server';
    this.decryption = 'Decryption Result';

    this.TXciphertext = 'Encrypted Text';
    this.TXiv = 'Generated IV';
    this.RXplaintext = 'Plaintext decrypted in Server';
  }

  ngOnInit(): void {
    const clientParams = ClientParams.getInstance();
    console.log(clientParams);
  }

  public getCipherText() { //AES, 256 bits key, CTR mode, 128 bits IV
    this.aesCriptoService.getCipherText()
      .subscribe(res => {
        console.log(res);
        this.RXciphertext = res.c as string;
        this.RXiv = res.iv as string;

        const clientParams = ClientParams.getInstance();

        this.decryption = CryptoJS.AES.decrypt(this.RXciphertext, clientParams.getAESkey(), { iv: res.iv, mode: CryptoJS.mode.CTR }).toString(CryptoJS.enc.Utf8);
      });
  }

  public encrypt() { //AES, 256 bits key, CTR mode, 128 bits IV
    let plainText: string = this.criptoForm.get('plainTextInput').value;

    let IV = CryptoJS.lib.WordArray.random(128 / 8); //128 bits IV
    this.TXiv = IV.toString();

    const clientParams = ClientParams.getInstance();

    let cipherText: string = CryptoJS.AES.encrypt(plainText, clientParams.getAESkey(), { iv: IV, mode: CryptoJS.mode.CTR }).toString();
    this.TXciphertext = cipherText;
  }

  public getPlainText() {
    this.aesCriptoService.getPlainText(this.TXciphertext, this.TXiv)
      .subscribe(res => {
        console.log(res);

        this.RXplaintext = res.m as string;
      });
  }

}
