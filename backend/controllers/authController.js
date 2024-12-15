// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = (req, res) => {
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [req.body.username, req.body.email], (err, existingUser) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (existingUser.length > 0) {
      const error = existingUser[0].username === req.body.username ? 'Username is already taken' : 'Email is already taken';
      return res.status(409).json({ error });
    }

    bcrypt.hash(req.body.password.toString(), 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password' });

      db.query('INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)', [
        req.body.username,
        req.body.email,
        hashedPassword
      ], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

const login = (req, res) => {
  db.query('SELECT * FROM users WHERE email = ? OR username = ?', [req.body.username, req.body.username], (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password).then((result) => {
        if (err) return res.status(500).json({ error: 'Error comparing password' });
        if (result) {
          const username = user[0].username;
          const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1d' });
          res.cookie("token", token);
          res.status(200).json({ message: 'Logged in successfully' });
        } else {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
      });
    } else {
      
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
};

const logout = (req, res) => {
  res.clearCookie('token'); // Clear the JWT token cookie
  res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = { register, login, logout };
