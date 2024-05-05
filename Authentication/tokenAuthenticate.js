require('dotenv').config();
const jwt = require('jsonwebtoken');
const isAuthenticated = (req,res,next)=>{
    const jwtToken = req.header('Authorization');
  if (!jwtToken) {
    // If no token is provided, send a 401 Unauthorized response
    return res.status(401).json({ mssg: 'Token is not provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(jwtToken, process.env.secretKey);
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, send a 401 Unauthorized response
    res.status(401).json({ mssg: 'Invalid token' });
  }
}
module.exports = isAuthenticated;