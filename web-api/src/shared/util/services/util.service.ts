import {Injectable} from '@nestjs/common';
import {CipherKey, createCipheriv, createDecipheriv, randomBytes} from 'crypto';
import {EncryptResult} from '../../../domain/shared/util/models/results/encrypt.result';

@Injectable()
export class UtilService {
    private readonly algorithm: string = 'aes-256-ctr';
    private readonly secretKey: CipherKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

    public async encrypt(content: string): Promise<EncryptResult> {
        const iv = randomBytes(16);

        const cipher = createCipheriv(this.algorithm, this.secretKey, iv);

        const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    }

    public async decrypt(content: string, iv: string): Promise<string> {
        const decipher = createDecipheriv(this.algorithm, this.secretKey, Buffer.from(iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }

    public toJsonObject<S>(doc): S {
        const json = JSON.stringify(doc);
        return JSON.parse(json);
    }
}
