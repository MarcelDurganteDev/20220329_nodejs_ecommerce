const express = require( 'express' );
const app = express();
require( 'dotenv' ).config();

// route
app.get( '/', ( req, res ) => {
    res.send( 'Hello from Node Marcel' )
} );

const port = process.env.PORT || 8000;

app.listen( port, () => {
    console.log(`Server is running on port ${port}`);
})

