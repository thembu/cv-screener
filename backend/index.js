const express = require('express');
const app = express();
const screenerRoutes = require('./routes/screener');
const cors = require('cors');   
require('dotenv').config();

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use (cors());

app.use('/api/screener', screenerRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


