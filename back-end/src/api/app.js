const express = require('express');
const cors = require('cors');
const loginRoutes = require('../routes/users.routes');
const registerRoutes = require('../routes/register.routes');
const productsRoutes = require('../routes/products.routes');
const salesRoutes = require('../routes/sales.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
