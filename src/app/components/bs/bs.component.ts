import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bigintCryptoUtils from 'bigint-crypto-utils';
import * as bigintConversion from 'bigint-conversion';

import { ClientParams } from 'src/app/ClientParams';

import { RSA } from 'src/app/models/RSA/rsa';
import { RSAPublicKey } from 'src/app/models/RSAPublicKey/rsapublic-key';
import { RSAPrivateKey } from 'src/app/models/RSAPrivateKey/rsaprivate-key';
import { RSACriptoService } from 'src/app/services/rsa-cripto/rsa-cripto.service';

import { BsService } from 'src/app/services/bs/bs.service';

@Component({
  selector: 'app-bs',
  templateUrl: './bs.component.html',
  styleUrls: ['./bs.component.css']
})
export class BsComponent implements OnInit {

  bsForm = new FormGroup({
    plainTextInput: new FormControl()
  });
  m; //Text or BigInt 
  r; //Text or BigInt
  bm; //Text or BigInt
  bs; //Text or BigInt
  s; //Text or HEX
  v; //Text or HEX
  verified: string;

  constructor(
    private rsaCriptoService: RSACriptoService,
    private bsService: BsService
  ) { 
    this.m = 'Message in BigInt format';
    this.r = 'Random Nonce';
    this.bm = 'Blinded Message';
    //this.bmDigest = 'Digest of the Blinded Message';
    this.bs = 'Blind Signature';
    this.s = 'Unblinded Signature';
    this.v = 'Verification of the Signature'
    this.verified = 'n';
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

          clientParams.setGeneratedKeyPair();
          console.log(clientParams);
        });
    }
  }

  public blindMessage(){
    const clientParams = ClientParams.getInstance();

    //FIRST WE CALCULATE THE VALUE OF r
    this.r = bigintCryptoUtils.randBetween(clientParams.getServerRSAkpub().n, BigInt(65536)); //Random nonce 
    let bcd: bigint = bigintCryptoUtils.gcd(this.r, clientParams.getServerRSAkpub().n); //Coprimes
    
    while(bcd != BigInt(1)){
      this.r = bigintCryptoUtils.randBetween(clientParams.getServerRSAkpub().n, BigInt(65536));
      bcd = bigintCryptoUtils.gcd(this.r, clientParams.getServerRSAkpub().n);
    }

    this.m = bigintConversion.textToBigint(this.bsForm.get('plainTextInput').value);
    this.bm = (this.m * clientParams.getServerRSAkpub().encrypt(this.r)) % (clientParams.getServerRSAkpub().n);
  }

  public getSigned(){
    const clientParams = ClientParams.getInstance();

    this.bsService.getSigned(this.bm)
    .subscribe(res => {
      console.log(res);

      this.bs = bigintConversion.hexToBigint(res.bs);
    });
  }

  public async unblindAndVerify(){
    const clientParams = ClientParams.getInstance();

    this.s = (this.bs * bigintCryptoUtils.modInv(this.r, clientParams.getServerRSAkpub().n)) % (clientParams.getServerRSAkpub().n);
    this.v = clientParams.getServerRSAkpub().verify(this.s);

    if(this.v == this.m)
      this.verified = 't';
    else 
      this.verified = 'f';
  }

}
