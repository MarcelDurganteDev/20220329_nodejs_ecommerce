const User = require( '../models/user' )
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = ( req, res ) => {
    // console.log('req.body', req.body);
    // create a new user based on what we get in the request body 
    // with the body-parser pkg we get anything in the body response
    const user = new User( req.body );
    user.save( (err, user) => {
        if ( err) {
            return res.status( 400 ).json( {
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json( {
            user
        })
    })
};