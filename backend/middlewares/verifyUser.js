const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.username = decoded.username;
      next();
    });
  }
};

module.exports = verifyUser;