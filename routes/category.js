const express = require('express');
const Router = express.Router();

const { create, categoryById, read, update, remove, list } = require( '../controllers/category' );

const { requireSignIn, isAuth, isAdmin } = require( '../controllers/auth' );

const { userById } = require( '../controllers/user' );



Router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);
Router.get('/category/:categoryId', read);
Router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update);
Router.delete( '/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, remove );
Router.get('/categories', list);

Router.param( 'categoryId', categoryById );
Router.param( 'userId', userById );

module.exports = Router;
