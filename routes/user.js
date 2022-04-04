const express = require('express');
const Router = express.Router();
const { findUserById } = require( '../controllers/user' );
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

// with "isAuth" middleware one user cannot access other user profile, user needs to be currently authenticated user
// TO SUMMARISE: to access this rout user needs to be logged in, be the currently authenticated user, and admin (role == 1)
Router.get( '/secret/:userId', requireSignIn, isAuth, isAdmin, ( req, res ) => {
    res.json( {
        user: req.profile
    } )
    console.log('hi from response');
})

Router.param('userId', findUserById);

module.exports = Router;
