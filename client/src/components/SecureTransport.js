import React from 'react';
const openpgp = require('openpgp');

function SecureTransport() {


    (async () => {
        const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
            type: 'ecc', // Type of the key, defaults to ECC
            curve: 'curve25519', // ECC curve name, defaults to curve25519
            userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
            passphrase: 'super long and hard to guess secret', // protects the private key
            format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
        });
    
        console.log(privateKey);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        console.log(publicKey);      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
        console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    })();

// (async () => {
//     const message = await openpgp.createMessage({ binary: new Uint8Array([0x01, 0x01, 0x01]) });
//     const encrypted = await openpgp.encrypt({
//         message, // input as Message object
//         passwords: ['secret stuff'], // multiple passwords possible
//         format: 'binary' // don't ASCII armor (for Uint8Array output)
//     });
//     console.log(encrypted); // Uint8Array

//     const encryptedMessage = await openpgp.readMessage({
//         binaryMessage: encrypted // parse encrypted bytes
//     });
//     const { data: decrypted } = await openpgp.decrypt({
//         message: encryptedMessage,
//         passwords: ['secret stuff'], // decrypt with password
//         format: 'binary' // output as Uint8Array
//     });
//     console.log(decrypted); // Uint8Array([0x01, 0x01, 0x01])
// })();

  return (
      <div>
        
      </div>
  )
}

export default SecureTransport;
