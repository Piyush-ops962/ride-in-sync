const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers['authorization'];
  // console.log(`token is ${token}`)
  // Check if token is not present
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    // Extract the actual token part (assuming format 'Bearer <token>')
    const actualToken = token.split(' ')[1];
    // Verify the token
    const decoded = jwt.verify(actualToken, 'your-secret-key');

    // Add user info to the request object
    req.user = decoded;
  } catch (err) {

    return res.status(401).send('Invalid Token');
  }

  return next();
};

module.exports = verifyToken;
