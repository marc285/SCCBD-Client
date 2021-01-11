import * as bigintCryptoUtils from 'bigint-crypto-utils';

import { RSAPublicKey } from 'src/app/models/RSAPublicKey/rsapublic-key';
import { RSAPrivateKey } from 'src/app/models/RSAPrivateKey/rsaprivate-key';

export class RSA {

    public static async generateKeys(bitLength: number) {
        const e: bigint = BigInt(65537);  //Default value for public exponent

        let p: bigint = await bigintCryptoUtils.prime((bitLength / 2) + 1);
        let q: bigint = await bigintCryptoUtils.prime(bitLength / 2);
        let n: bigint = p * q;
        let phi: bigint = ((p - BigInt(1)) * (q - BigInt(1)));
        let gcd: bigint = bigintCryptoUtils.gcd(e, phi);

        while ((bigintCryptoUtils.bitLength(n) != bitLength) && (gcd != BigInt(1))) {
            p = await bigintCryptoUtils.prime((bitLength / 2) + 1);
            q = await bigintCryptoUtils.prime(bitLength / 2);
            n = p * q;
            phi = ((p - BigInt(1)) * (q - BigInt(1)));
            gcd = bigintCryptoUtils.gcd(e, phi);
        }
        
        let d: bigint = bigintCryptoUtils.modInv(e, phi);

        let kpub: RSAPublicKey = new RSAPublicKey(e, n);
        let kpriv: RSAPrivateKey = new RSAPrivateKey(d, n);

        return {
            'kpub': kpub,
            'kpriv': kpriv
        };
    }

}
