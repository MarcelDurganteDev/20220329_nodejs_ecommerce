const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// import routes

const userRoutes = require('./routes/user')

// app
const app = express();

// db connection

mongoose
    .connect( process.env.DATABASE, {} )
    .then( () => {
        console.log( 'DB Connected' );
    } )
    .catch( ( err ) => console.log( 'DB error => ', err ) );

// routes middleware
app.use('/api', userRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


