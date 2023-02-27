const express = require('express');
const loginRoutes = require('../routes/users.routes');

const app = express();
app.use(express.json());

// app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoutes);

module.exports = app;
