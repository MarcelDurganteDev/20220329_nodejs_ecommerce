const express = require('express');
const Router = express.Router();

const { create, productById, read, remove, update, list } = require('../controllers/product');
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

Router.get('/products', list);

Router.post( '/product/create/:userId', requireSignIn, isAuth, isAdmin, create );
Router.get('/product/:productId', read);
Router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove );
Router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update );

Router.param('userId', userById);
Router.param('productId', productById);

module.exports = Router;
