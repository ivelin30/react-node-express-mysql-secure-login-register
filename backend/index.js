require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
