const crypto = require('crypto');
// var bcrypt = require('bcryptjs');

// const algorithm = 'aes-256-cbc';
const algorithm = 'aes-256-ctr';

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); 



// exports.encrypt = function encrypt(text){
//     let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//     let encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return {iv: iv.toString('hex'), Password: encrypted.toString('hex')};
// };

// exports.decrypt = function decrypt(text){
//     console.log(text.iv);
//     let iv = Buffer.from(text.iv, 'hex');
//     let encryptedText = Buffer.from(text.Password, 'hex');
//     let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//     console.log('encrypt ===> '+ encryptedText);
//     let decrypted = decipher.update(encryptedText);
//     console.log('decrypt -====>  '+ decrypted);
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return decrypted.toString();
// };

