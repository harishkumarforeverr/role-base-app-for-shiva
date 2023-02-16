import CryptoJS from "crypto-js";
const secretKey = "mySecretkey123";

//encrypt the password
export const getEncryptedPassword = (password) =>
  CryptoJS.AES.encrypt(password, secretKey).toString();

  //decrypt the password
export const getdecrptedPassword = (encryptedPassword) => {
  var bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
