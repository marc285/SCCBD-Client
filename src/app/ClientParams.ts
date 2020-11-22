import { RSAPublicKey } from './models/RSAPublicKey/rsapublic-key';
import { RSAPrivateKey } from './models/RSAPrivateKey/rsaprivate-key';

export class ClientParams {  //Singleton Pattern

    private static instance: ClientParams;

    private ip: string; //IP address of the Server to connect with
    private port: number; //Port of the Server to connect with
    private AESkey: string; //HEX
    private RSAkpub: RSAPublicKey; //e,n BigInt
    private RSAkpriv: RSAPrivateKey; //d,n Bigint
    private generatedKeyPair: boolean; //To avoid generating more than one RSA KeyPair
    private serverRSAkpub: RSAPublicKey; //Public key of the Server

    private constructor() { //Empty initialization 
        this.ip = '';
        this.port = 0;
        this.AESkey = '';
        this.RSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.RSAkpriv = new RSAPrivateKey(BigInt(0), BigInt(0));
        this.generatedKeyPair = false;
        this.serverRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
    };

    public static getInstance(): ClientParams {
        if (!ClientParams.instance) {
            ClientParams.instance = new ClientParams();
        }

        return ClientParams.instance;
    }

    public getIP(): string {
        return this.ip;
    }

    public setIP(ip: string) {
        this.ip = ip;
    }

    public getPort(): number {
        return this.port;
    }

    public setPort(port: number) {
        this.port = port;
    }

    public getAESkey(): string {
        return this.AESkey;
    }

    public setAESkey(AESkey: string) {
        this.AESkey = AESkey;
    }

    public getRSAkpub(): RSAPublicKey {
        return this.RSAkpub;
    }

    public setRSAkpub(RSAkpub: RSAPublicKey) {
        this.RSAkpub = RSAkpub;
    }

    public getRSAkpriv(): RSAPrivateKey {
        return this.RSAkpriv;
    }

    public setRSAkpriv(RSAkpriv: RSAPrivateKey) {
        this.RSAkpriv = RSAkpriv;
    }

    public getGeneratedKeyPair(): boolean {
        return this.generatedKeyPair;
    }

    public setGeneratedKeyPair() {
        this.generatedKeyPair = true;
    }

    public getServerRSAkpub(): RSAPublicKey {
        return this.serverRSAkpub;
    }

    public setServerRSAkpub(RSAkpub: RSAPublicKey) {
        this.serverRSAkpub = RSAkpub;
    }

}