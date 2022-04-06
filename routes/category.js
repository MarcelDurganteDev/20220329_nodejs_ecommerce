const express = require('express');
const Router = express.Router();

const { create, categoryById, read } = require( '../controllers/category' );

const { requireSignIn, isAuth, isAdmin } = require( '../controllers/auth' );

const { userById } = require( '../controllers/user' );



Router.get('/category/:categoryId', read);
Router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);

Router.param( 'categoryId', categoryById );
Router.param( 'userId', userById );

module.exports = Router;
