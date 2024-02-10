// import React, { useState } from 'react';
// import NodeRSA from 'node-rsa'; // Importing node-rsa library

// const SecureTransport = () => {
//   const [message, setMessage] = useState('');
//   const [encryptedMessage, setEncryptedMessage] = useState('');

//   // Function to encrypt message with server's public key
//   const encryptMessage = (message, publicKey) => {
//     const key = new NodeRSA(publicKey);
//     return key.encrypt(message, 'base64');
//   };

//   // Function to handle message submission
//   const handleSubmit = async () => {
//     try {
//       // Fetch server's public key from /auth endpoint
//       const response = await fetch('/auth');
//       const publicKey = await response.text();

//       // Encrypt message with server's public key
//       const encrypted = encryptMessage(message, publicKey);
//       setEncryptedMessage(encrypted);

//       // Send encrypted message to the server
//       const serverResponse = await fetch('/auth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ encryptedMessage: encrypted }),
//       });

//       // Handle server response
//       const data = await serverResponse.json();
//       console.log('Server response:', data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button onClick={handleSubmit}>Send Message</button>
//       <p>Encrypted Message: {encryptedMessage}</p>
//     </div>
//   );
// };

// export default SecureTransport;
