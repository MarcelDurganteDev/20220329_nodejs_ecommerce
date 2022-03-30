const express = require( 'express' );
const Router = express.Router();
const { sayHi } = require('../controllers/user');


Router.get( '/', sayHi)

module.exports = Router;