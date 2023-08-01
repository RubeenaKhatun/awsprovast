// encryption.js

const CryptoJS = require('crypto-js');

// Encryption key - It's important to keep this key safe and private in production.
const ENCRYPTION_KEY = 'YourSecretEncryptionKey';

// Function to encrypt a string
const encryptString = (text) => {
  const cipherText = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
  return cipherText;
};

// Function to decrypt a string
const decryptString = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { encryptString, decryptString };
