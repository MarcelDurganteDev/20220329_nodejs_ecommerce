const express = require('express');
const Router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategoriesInUseByProducts,
    listBySearch
} = require('../controllers/product');
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

Router.get('/products', list);
Router.get('/products/related/:productId', listRelated);
Router.get( '/products/categories', listCategoriesInUseByProducts );
Router.post('/products/by/search', listBySearch);


Router.post( '/product/create/:userId', requireSignIn, isAuth, isAdmin, create );
Router.get('/product/:productId', read);
Router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove );
Router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update );

Router.param('userId', userById);
Router.param('productId', productById);

module.exports = Router;
