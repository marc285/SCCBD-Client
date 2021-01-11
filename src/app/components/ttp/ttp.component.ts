import { Component, OnInit } from '@angular/core';
import * as bigintConversion from 'bigint-conversion';
import * as objectSha from 'object-sha';
import * as CryptoJS from 'crypto-js';

import { ClientParams } from 'src/app/ClientParams';

import { RSA } from 'src/app/models/RSA/rsa';
import { RSAPublicKey } from 'src/app/models/RSAPublicKey/rsapublic-key';
import { RSAPrivateKey } from 'src/app/models/RSAPrivateKey/rsaprivate-key';

import { KeyExchangeService } from 'src/app/services/key-exchange/key-exchange.service';
import { TtpService } from 'src/app/services/ttp/ttp.service';

@Component({
  selector: 'app-ttp',
  templateUrl: './ttp.component.html',
  styleUrls: ['./ttp.component.css']
})
export class TtpComponent implements OnInit {

  cipherContent: any;
  sharedKey: any; //Shared Key (K of the TTP schema) obtained from the TTP
  plainContent: any; //Content after decrypted with the Shared Key

  //Graphics
  visibleArrow1: boolean;
  PoVerification: boolean; //If Proof of origin is verified or not
  visibleArrow2: boolean;
  PrVerification: boolean; //If Proof of reception (in Server) is verified or not
  visibleArrow34: boolean;
  PkoVerification: boolean; //If Proof of origin of K (in the TTP) is verified or not
  PkpSVerification: boolean; //If Proof of publication of K (in Server) is verified or not
  visibleArrow4: boolean;
  PkpCVerification: boolean; //If Proof of publication of K (in Client) is verified or not

  constructor(
    private keyExchangeService: KeyExchangeService,
    private ttpService: TtpService
  ) { 
    this.cipherContent = "Encrypted Content received from Server. You'll need a Shared Key (stored in the TTP) to decrypt it";
    this.sharedKey = "Shared Key (K) stored in the TTP";
    this.plainContent = "Decrypted Content";

    this.visibleArrow1 = false;
    this.PoVerification = null;
    this.visibleArrow2 = false;
    this.PrVerification = null;
    this.visibleArrow34 = false;
    this.PkoVerification = null;
    this.PkpSVerification = null;
    this.visibleArrow4 = false;
    this.PkpSVerification = null;
  }

  async ngOnInit() {
    const clientParams = ClientParams.getInstance();

    if (clientParams.getGeneratedKeyPair() == false) {

      //GENERATE (2048 bits) RSA KEY PAIR FOR THIS SESSION
      let kp = await RSA.generateKeys(2048);
      clientParams.setRSAkpub(kp.kpub as RSAPublicKey);
      clientParams.setRSAkpriv(kp.kpriv as RSAPrivateKey);

      let ttpFlag = true;
      this.keyExchangeService.serverKeyExchange(ttpFlag)
        .subscribe(res => {
          clientParams.setServerRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(res.e as string), bigintConversion.hexToBigint(res.n as string)));

          clientParams.setGeneratedKeyPair();

          this.keyExchangeService.ttpKeyExchange()
          .subscribe(res => {
            clientParams.setTTPRSAkpub(new RSAPublicKey(bigintConversion.hexToBigint(res.e as string), bigintConversion.hexToBigint(res.n as string)));

            console.log(clientParams);
          });
        });
    }
  }

  public getContent() {
    this.visibleArrow1 = true;

    const clientParams = ClientParams.getInstance();

    this.ttpService.getContent()
    .subscribe(async res => {
      console.log(res);
      let obj: any = res.obj;

      let serializedBody = objectSha.hashable(obj.body);
      const hashObj: string = await objectSha.digest(serializedBody); //HEX
      const hashProof: bigint = clientParams.getServerRSAkpub().verify(bigintConversion.hexToBigint(obj.proof.value));

      if(hashObj == bigintConversion.bigintToHex(hashProof)){
        this.PoVerification = true;
        clientParams.setTTPcontent(obj.body.msg);
        console.log(clientParams);
        this.cipherContent = obj.body.msg;
        console.log(true);
      }
      else{
        this.PoVerification = false;
        clientParams.setTTPcontent("Proof of origin Error");
        this.cipherContent = "Error: Can't verify the proof of origin";
      }
    });
  }

  public async sendInterest() {
    this.visibleArrow2 = true;

    const clientParams = ClientParams.getInstance();

    if(this.PoVerification) {
      let body: object = {
        'type': "2", 'src': "A", 'dst': "B", 'ttp': "TTP", 'ts': Date.now()
      }

      const serializedBody = objectSha.hashable(body);
      const digest = await objectSha.digest(serializedBody);
      const signature = clientParams.getRSAkpriv().sign(bigintConversion.hexToBigint(digest));

      let obj: object = {
        'body' : body,
        'proof': { 'type': "Proof of reception", 'value': bigintConversion.bigintToHex(signature) }
      }

      this.ttpService.sendInterest(obj)
      .subscribe(res => {
        console.log(res);
        this.PrVerification = true;
        this.visibleArrow34 = true;
        this.PkoVerification = true;
        this.PkpSVerification = true;

      }, (err) => {
        console.log(err);
        if(err.error.obj == `Error: Can't verify the proof of publication of K of the TTP`){
          this.PkpSVerification = false;
        }
        else if(err.error.obj == `Error: Can't verify the proof of reception`){
          this.PrVerification = false;
        }
        else if(err.error.obj == `Error: Can't verify the proof of origin of K`){
          this.PkoVerification = false;
        }
      });
    }
  }

  public getKey() {
    const clientParams = ClientParams.getInstance();

    if(this.PrVerification) {

      this.ttpService.getKey()
      .subscribe(async res => {
        let obj: any = res.obj;
        console.log(res);

        let serializedBody = objectSha.hashable(obj.body);
        const hashObj: string = await objectSha.digest(serializedBody); //HEX
        const hashProof: bigint = clientParams.getTTPRSAkpub().verify(bigintConversion.hexToBigint(obj.proof.value));

        if(hashObj == bigintConversion.bigintToHex(hashProof)){
          this.PkpCVerification = true;
          clientParams.setTTPSharedKey(obj.body.msg);
          this.sharedKey = `K:${obj.body.msg.k}\nIV:${obj.body.msg.iv}`;
        }
        else{
          this.PkpCVerification = false;
          clientParams.setTTPSharedKey("Proof of publication of K Error");
          this.sharedKey = "Error: Can't verify the proof of publication of K";
        }
      });
    }
  }

  public async decryptContent(){ //AES, 256 bits key, CTR mode, 128 bits IV
    const clientParams = ClientParams.getInstance();
    
    if(this.PkpSVerification)
      this.plainContent = CryptoJS.AES.decrypt(this.cipherContent, clientParams.getTTPSharedKey().k , { iv: clientParams.getTTPSharedKey().iv, mode: CryptoJS.mode.CTR }).toString(CryptoJS.enc.Utf8);
    else
      this.plainContent = "Couldn't decrypt the content. Missing one or more steps.";
  }

}
