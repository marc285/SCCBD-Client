import * as bigintCryptoUtils from 'bigint-crypto-utils';

export class RSAPrivateKey {

    d: bigint;
    n: bigint;

    constructor(d: bigint, n: bigint) {
        this.d = d;
        this.n = n;
    }

    public decrypt(cipherText: bigint) { //BigInt encoded
        return bigintCryptoUtils.modPow(cipherText, this.d, this.n);
    }

    public sign(input: bigint) {  //BigInt encoded
        return bigintCryptoUtils.modPow(input, this.d, this.n);
    }

}
