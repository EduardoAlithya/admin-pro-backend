const { response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerificar = async (token) => {

try {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  console.log(payload);
  const { name, email, picture } = payload;
  const userid = payload['sub'];

  return { name, email, picture }
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
} catch (error) {

}
}


module.exports = {
  googleVerificar
}