const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// FIND BY ID MIDDLEWARE

// get a single product and be able to delete, updated, edit
exports.productById = function ( req, res, next, id ) {
    Product.findById(id)
        // .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};

// CREATE METHOD

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // Check for all fields
        const { name, description, price, category, quantity, shipping } =
            fields;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        ) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }
        product.save((err, result) => {
            if (err) {
                res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(result);
        });
    });
};

// READ METHOD

exports.read = function (req, res) {
    if (req.product && req.product.photo == undefined) {
        req.product.photo = undefined;
    }
    return res.json(req.product);
};

// UPDATE METHOD

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // Check for all fields
        const { name, description, price, category, quantity, shipping } =
            fields;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        ) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }
        let product = req.product;
        // lodash method,
        product = _.extend(product, fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }
        product.save(err => {
            if (err) {
                res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json( {
                message: 'Product Updated Successfully'
            } );
            
            
        });
    });
};

// DELETE METHOD

exports.remove = (req, res) => {
    let product = req.product;
    product.remove(err => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};

/**
 * @desc Show products sorted by most popular/sold and new products. This method returns all the products if no query is passed ( no params sent).
 */

exports.list = ( ( req, res ) => {
    // if no order in query (url) returns ascending by default
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? req.query.limit : 2;

    Product.find()
        // diselect product photo from search
        .select( '-photo' )
        .populate( 'category' )
        .sort( [[sortBy, order]] )
        .limit( limit )
        // executes the queries based on what is passed in the query (url)
        .exec( ( err, products ) => {
            if ( err ) {
                return res.status( 400 ).json( {
                    error: errorHandler(err)
                } );
            }
            res.send( products )
        } );
} );

/**
 * @desc:  This method find the products based on the req. product category
 * not including it self
 */

exports.listRelated = ( req, res ) => {
    let limit = req.query.limit ? parseInt( req.query.limit ) : 6;
    Product.find( { _id: { $ne: req.product }, category: req.product.category } )
        .limit( limit )
        .populate( 'category', '_id name' )
        .exec( ( err, products ) => {
            if ( err ) {
                return res.status( 400 ).json( {
                    error: 'Products not found'
                } );
            }
            res.send( products )
        } );
};
    

