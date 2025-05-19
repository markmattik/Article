// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

const SECRET = 'your_jwt_secret'; // Replace with environment variable in production

// Registreerimine
router.post('/register', async (req, res) => {
   console.log('POST /api/register called');
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('POST /api/login called');
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, email: user.email }, });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
