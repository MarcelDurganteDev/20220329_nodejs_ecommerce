const express = require( 'express' );
const Router = express.Router();
const { signup, signin, signout, requireSignIn } = require( '../controllers/user' );
const { userSignupValidator } = require('../validator')


Router.post( '/signup', userSignupValidator, signup );
Router.post( '/signin', signin );
Router.get( '/signout', signout );

module.exports = Router;