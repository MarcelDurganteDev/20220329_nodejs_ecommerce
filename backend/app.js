const express = require('express');
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const cookieParser = require( 'cookie-parser' )
const cors = require( 'cors' );
const expressValidator = require('express-validator')
const dotenv = require('dotenv');
dotenv.config();

// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const removeRoutes = require('./routes/product')
const updateRoutes = require('./routes/product')

// app
const app = express();

// db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

// middlewares
app.use( morgan( 'dev' ) );

// replaced body-parser.json() - deprecated ???
app.use( express.json() );
// used in requireSignIn method so it works
app.use( cookieParser() );
app.use( cors() );

app.use( expressValidator() );


// routes middleware app.use(), 1st is path, 2nd is module that manages it
app.use( '/api', authRoutes );
app.use( '/api', userRoutes );
app.use( '/api', categoryRoutes );
app.use( '/api', productRoutes );
app.use( '/api', removeRoutes );
app.use( '/api', updateRoutes );

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log( `Server is running on port ${port}` );
});


