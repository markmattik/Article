const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(auth.split(' ')[1], SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
