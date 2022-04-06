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
    category.save((err, data) => {
        if ( err ) {
            // console.log('category', req.category)
            // console.log('body', req.body)
            // console.log('name', req.body.name)
            res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( {
            message: 'Product Updated Successfully'
        });
    });
};



