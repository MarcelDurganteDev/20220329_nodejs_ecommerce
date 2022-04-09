const User = require('../models/user');

// middleware
// userById method
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

/**
 * @desc: get User information 
 */

exports.readUser = ( req, res ) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json( req.profile );
};


/**
 * @desc: update User information 
 */

exports.updateUser = ( req, res ) => {
    User.findOneAndUpdate( { _id: req.profile._id }, { $set: req.body }, { new: true }, ( err, user ) => {
        if ( err ) {
            return res.status( 400 ).json( {
                error: 'User not found or you are not authorized to perform this action'
            } );
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json( user );
    } );
  
};