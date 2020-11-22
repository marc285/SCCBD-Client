import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bigintConversion from 'bigint-conversion';

import { ClientParams } from 'src/app/ClientParams';

import { RSA } from 'src/app/models/RSA/rsa';
import { RSAPublicKey } from 'src/app/models/RSAPublicKey/rsapublic-key';
import { RSAPrivateKey } from 'src/app/models/RSAPrivateKey/rsaprivate-key';

import { RSACriptoService } from 'src/app/services/rsa-cripto/rsa-cripto.service';

@Component({
  selector: 'app-rsa-cripto',
  templateUrl: './rsa-cripto.component.html',
  styleUrls: ['./rsa-cripto.component.css']
})
export class RSACriptoComponent implements OnInit {

  //To show in the Controller both KeyPairs
  clkpube;  //Text or BigInt
  clkpubn; //Text or BigInt
  svkpube; //Text or BigInt
  svkpubn; //Text or BigInt

  //GET (Get Ciphertext from Server and Decrypt)
  RXciphertext; //Text or BigInt
  decryption: string; //Received ciphertext after being decrypted by the Client

  //POST (Send Plaintext and Server encrypts it)
  criptoForm = new FormGroup({
    plainTextInput: new FormControl()
  });
  TXciphertext; //Text or BigInt
  RXplaintext: string;  //Received ciphertext decrypted by the Server

  constructor(
    private rsaCriptoService: RSACriptoService
  ) {
    this.clkpube = 'Public Exponent';
    this.clkpubn = 'Public Modulus';
    this.svkpube = 'Public Exponent';
    this.svkpubn = 'Public Modulus';

    this.RXciphertext = 'Ciphertext Received from Server';
    this.decryption = 'Decryption Result';

    this.TXciphertext = 'Encrypted Text';
    this.RXplaintext = 'Plaintext decrypted in Server';
  }

  async ngOnInit() {
    const clientParams = ClientParams.getInstance();

    if (clientParams.getGeneratedKeyPair() == false) {
      //GENERATE (2048 bits) RSA KEY PAIR FOR THIS SESSION
      let kp = await RSA.generateKeys(2048);
      clientParams.setRSAkpub(kp.kpub as RSAPublicKey);
      clientParams.setRSAkpriv(kp.kpriv as RSAPrivateKey);

      this.rsaCriptoService.keyExchange()
        .subscribe(res => {
          clientParams.setServerRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(res.e as string), bigintConversion.hexToBigint(res.n as string)));

          this.clkpube = clientParams.getRSAkpub().e;
          this.clkpubn = clientParams.getRSAkpub().n;
          this.svkpube = clientParams.getServerRSAkpub().e;
          this.svkpubn = clientParams.getServerRSAkpub().n;

          clientParams.setGeneratedKeyPair();
          console.log(clientParams);
        });
    }
  }

  public getCipherText() { //RSA 2048 bits
    this.rsaCriptoService.getCipherText()
      .subscribe(res => {
        console.log(res);
        this.RXciphertext = bigintConversion.hexToBigint(res.c as string);

        const clientParams = ClientParams.getInstance();

        this.decryption = bigintConversion.bigintToText(clientParams.getRSAkpriv().decrypt(this.RXciphertext));
      });
  }

  public encrypt() { //RSA 2048 bits
    let plainText: string = this.criptoForm.get('plainTextInput').value;

    const clientParams = ClientParams.getInstance();
    this.TXciphertext = clientParams.getServerRSAkpub().encrypt(bigintConversion.textToBigint(plainText));
  }

  public getPlainText() {
    this.rsaCriptoService.getPlainText(this.TXciphertext)
      .subscribe(res => {
        console.log(res);

        this.RXplaintext = res.m;
      });
  }

}
