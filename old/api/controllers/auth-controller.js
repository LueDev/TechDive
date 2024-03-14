const openpgp = require('openpgp');

const generateKeyPair = async (firstname, lastname, email) => {
  const { privateKey, publicKey, revocationCertificate } =
    await openpgp.generateKey({
      type: 'ecc',
      curve: 'curve25519',
      userIDs: [{ firstname, lastname, email }],
      passphrase: 'super long and hard to guess secret',
      format: 'armored',
    });

  return { privateKey, publicKey, revocationCertificate };
};

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

const sendMessage = async (req, res) => {
  try {
    const { encryptedMessage } = req.body;

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
