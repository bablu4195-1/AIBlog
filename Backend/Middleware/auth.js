// auth.js
const jwt = require('jsonwebtoken');
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');
  
    const token = authHeader.replace('Bearer ', '');
    
    try {
      const decoded = jwt.verify(token, jwtPrivateKey);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  }
  

module.exports = auth;
