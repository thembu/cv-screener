const express = require('express');
const app = express();
const screenerRoutes = require('./routes/screener');

app.use(express.json());
app.use (cors());

app.use('/api/screener', screenerRoutes);

