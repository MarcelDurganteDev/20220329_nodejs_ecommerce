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
