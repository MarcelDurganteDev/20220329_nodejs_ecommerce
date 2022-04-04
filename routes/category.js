const express = require('express');
const Router = express.Router();

const { create } = require( '../controllers/category' );

const { requireSignIn, isAuth, isAdmin } = require( '../controllers/auth' );

const { userById } = require( '../controllers/user' );



Router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);

Router.param( 'userId', userById );

module.exports = Router;
