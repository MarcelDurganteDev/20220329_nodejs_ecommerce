const express = require( 'express' );
const Router = express.Router();
const { signup } = require('../controllers/user');


Router.post( '/signup', signup );

module.exports = Router;