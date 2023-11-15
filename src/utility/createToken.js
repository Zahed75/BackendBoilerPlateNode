const jwt = require('jsonwebtoken');

const createToken = (payload, expiry) => {
  const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, expiry);

  return token;
};
module.exports = createToken;
