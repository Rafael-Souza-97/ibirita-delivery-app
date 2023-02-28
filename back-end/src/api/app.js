const express = require('express');
const cors = require('cors');
const loginRoutes = require('../routes/users.routes');
const registerRoutes = require('../routes/register.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

module.exports = app;
