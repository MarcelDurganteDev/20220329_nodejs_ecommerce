const express = require('express');
const Router = express.Router();

const {
    create
} = require( '../controllers/category' );


Router.post('/category/create', create);

module.exports = Router;
