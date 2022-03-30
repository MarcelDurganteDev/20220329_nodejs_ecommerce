const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
// app
const app = express();

// routes
app.get('/', (req, res) => {
    res.send('Hello from Node Marcel');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// // db connection

mongoose
    .connect( process.env.DATABASE, {} )
    .then( () => {
        console.log( 'DB Connected' );
    } )
    .catch( ( err ) => console.log( 'DB error => ', err ) );
