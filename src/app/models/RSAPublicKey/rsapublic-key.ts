import * as bigintCryptoUtils from 'bigint-crypto-utils';

export class RSAPublicKey {

    e: bigint;
    n: bigint;

    constructor(e: bigint, n: bigint) {
        this.e = e;
        this.n = n;
    }

    public encrypt(plainText: bigint) { //BigInt encoded
        return bigintCryptoUtils.modPow(plainText, this.e, this.n);
    }

    public verify(signature: bigint) { //BigInt encoded
        return bigintCryptoUtils.modPow(signature, this.e, this.n);
    }

}
