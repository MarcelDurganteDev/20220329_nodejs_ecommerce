const express = require('express');
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser')
const cookieParser = require( 'cookie-parser')
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


// middlewares
app.use( morgan( 'dev' ) );
app.use( bodyParser.json() );
app.use( cookieParser() );


// routes middleware
app.use('/api', userRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


