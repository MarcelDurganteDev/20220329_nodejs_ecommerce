const express = require( 'express' );
const Router = express.Router();
const { signup } = require( '../controllers/user' );
const { userSignupValidator } = require('../validator')


Router.post( '/signup', userSignupValidator, signup );

module.exports = Router;