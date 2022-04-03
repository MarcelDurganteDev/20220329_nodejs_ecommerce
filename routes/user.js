const express = require( 'express' );
const Router = express.Router();
const { signup, signin } = require( '../controllers/user' );
const { userSignupValidator } = require('../validator')


Router.post( '/signup', userSignupValidator, signup );
Router.post( '/signin', signin );

module.exports = Router;