const Category = require( '../models/category' );
const { errorHandler } = require( '../helpers/dbErrorHandler' );

// FIND BY ID MIDDLEWARE

exports.categoryById = ( req, res, next, id ) => {
    Category.findById( id )
        .exec( ( err, category ) => {
        if ( err || !category ) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    })
}

// CREAT METHOD

exports.create = ( req, res ) => {
    const category = new Category( req.body );
    category.save( (err, data) => {
        if ( err ) {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        }
        res.json( { data } );
    })
}

// READ METHOD

exports.read = ( req, res ) => {
    return res.json( req.category );
};

// UPDATE METHOD

exports.update = ( req, res) => {
    let category = req.category;
    category.name = req.body.name;
    category.save(err=> {
        if ( err ) {
            res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( {
            message: 'Product Updated Successfully'
        });
    });
};

// DELETE METHOD

exports.remove = ( req, res) => {
    let category = req.category;
    category.remove((err, data) => {
        if ( err ) {
            res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( {
            data,
            message: 'Product Deleted Successfully'
        });
    });
};

// LIST ALL METHOD

exports.list = ( req, res ) => {
    // The find() method returns all the matching documents in the collection as an array. To find a single document, you can either use the findById() method or the findOne() method:
    Category.find().exec((err, data) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            data
        } );
    });
};




