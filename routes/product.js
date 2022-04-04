const express = require('express');
const Router = express.Router();

const { create } = require('../controllers/product');
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

Router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);

Router.param('userId', userById);

module.exports = Router;
