const express = require('express');
const userPetition = require('./routes/userPetitions');
const config = require('./config');

const app = express();

// database
app.use(express.json());

// routes
userPetition(app);

app.listen(config.port, function () {
    console.log(`http://localhost:${config.port}`);   
});
