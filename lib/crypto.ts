import { AES, enc } from "crypto-js";

export const encrypt = (text: string) => {
  return AES.encrypt(text, "m4AfXfQ&1brl3LjQFYO").toString();
};

export const decrypt = (encryptedText: string) => {
  return AES.decrypt(encryptedText, "m4AfXfQ&1brl3LjQFYO").toString(enc.Utf8);
};
