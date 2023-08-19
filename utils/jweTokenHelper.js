import * as jose from 'jose';
import { config as dotenvConfig } from 'dotenv';
import { appendFile } from 'node:fs';

export const generateJWEToken = async (user) => {
  const ALG = 'RSA-OAEP-256';
  const ENC = 'A256GCM';
  const PUBLIC_KEY = 'PUBLIC_KEY';
  const PRIVATE_KEY = 'PRIVATE_KEY';
  const ENV_VALUES = dotenvConfig();

  let _publicKey;
  let _privateKey;

  try {
    if (!(PUBLIC_KEY in ENV_VALUES['parsed'])) {
      // there are no Public and Private keys in env file
      const { publicKey, privateKey } = await jose.generateKeyPair(ALG);
      _publicKey = publicKey;
      _privateKey = privateKey;

      const spkiPem = await jose.exportSPKI(publicKey);
      const pkcs8Pem = await jose.exportPKCS8(privateKey);

      let keys = `\n\n${PUBLIC_KEY}= "${spkiPem}"\n${PRIVATE_KEY}= "${pkcs8Pem}"`;

      appendFile('./.env', keys, (error) => {
        if (error) throw error;
      });
    } else {
      _publicKey = await jose.importSPKI(process.env.PUBLIC_KEY, ALG);
      _privateKey = await jose.importPKCS8(process.env.PRIVATE_KEY, ALG);
    }

    return await new jose.CompactEncrypt(
      new TextEncoder().encode(JSON.stringify(user))
    )
      .setProtectedHeader({ alg: ALG, enc: ENC })
      .encrypt(_publicKey);
  } catch (error) {
    throw error;
  }
};
