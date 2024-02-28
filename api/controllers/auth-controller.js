const openpgp = require('openpgp');

// Function to generate a key pair
const generateKeyPair = async (firstname, lastname, email) => {
  const { privateKey, publicKey, revocationCertificate } =
    await openpgp.generateKey({
      type: 'ecc', // Type of the key, defaults to ECC
      curve: 'curve25519', // ECC curve name, defaults to curve25519
      userIDs: [{ firstname: firstname, lastname: lastname, email: email }], // you can pass multiple user IDs. We'll pass the IDs in the JWT maybe?
      passphrase: 'super long and hard to guess secret', // protects the private key
      format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });

  return { privateKey, publicKey, revocationCertificate };
  // console.log(privateKey);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
  // console.log(publicKey);      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  // console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
};

// Handler to get the public key
const getPublicKey = async (req, res) => {
  try {
    console.log('/auth - public key controller reached');

    const { publicKey } = await generateKeyPair();
    res.status(200).send(publicKey);
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to get public key.' });
  }
};

// Handler to receive and decrypt message
const sendMessage = async (req, res) => {
  try {
    const encryptedMessage = req.body.encryptedMessage;

    const { privateKeyArmored } = await generateKeyPair();
    const privateKey = await openpgp.readKey({ armoredKey: privateKeyArmored });

    const { data: decrypted } = await openpgp.decrypt({
      message: await openpgp.message.readArmored(encryptedMessage),
      privateKeys: [privateKey],
    });
    console.log('Decrypted Message:', decrypted);

    res.json({
      success: true,
      message: 'Message received and decrypted successfully.',
    });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to decrypt message.' });
  }
};

module.exports = {
  getPublicKey,
  sendMessage,
};
