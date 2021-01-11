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
    private ttpIP: string; //IP address of the TTP to connect with
    private ttpPort: number; //Port of the TTP to connect with
    private ttpRSAkpub: RSAPublicKey; //Public key of the TTP
    private ttpSharedKey: any; //(K of the TTP schema)
    private ttpContent: any; //Cotnent received from the Server

    private constructor() { //Empty initialization 
        this.ip = '';
        this.port = 0;
        this.AESkey = '';
        this.RSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.RSAkpriv = new RSAPrivateKey(BigInt(0), BigInt(0));
        this.generatedKeyPair = false;
        this.serverRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.ttpIP = '';
        this.ttpPort = 0;
        this.ttpRSAkpub = new RSAPublicKey(BigInt(0), BigInt(0));
        this.ttpSharedKey = {};
        this.ttpContent = '';
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

    public getTTPip(): string {
        return this.ttpIP;
    }

    public setTTPip(ttpIP: string){
        this.ttpIP = ttpIP;
    }

    public getTTPport(): number {
        return this.ttpPort;
    }

    public setTTPport(ttpPort: number){
        this.ttpPort = ttpPort;
    }

    public getTTPRSAkpub(): RSAPublicKey {
        return this.ttpRSAkpub;
    }

    public setTTPRSAkpub(RSAkpub: RSAPublicKey) {
        this.ttpRSAkpub = RSAkpub;
    }

    public getTTPSharedKey(): any {
        return this.ttpSharedKey;
    }

    public setTTPSharedKey(ttpSharedKey: any) {
        this.ttpSharedKey = ttpSharedKey;
    }

    public getTTPcontent(): any {
        return this.ttpContent;
    }

    public setTTPcontent(ttpContent: any) {
        this.ttpContent = ttpContent;
    }

}