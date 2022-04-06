// A "Schema" for a database can be compared with the "Class" in object-oriented programming. Just like a class that provides a blueprint for creating objects in a program, a schema provides a blueprint for creating objects (called documents in MongoDB) in a database.

// In a Node.js application, we can use the Mongoose object data modeling (ODM) tool to define a schema for a MongoDB collection. A Mongoose schema defines the structure of the document, document properties, default values, validators, static methods, virtuals, etc.

// https://attacomsian.com/blog/mongoose-schemas

const mongoose = require( 'mongoose' );

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }
    },
    { timestamps: true }
);

// A Mongoose model is the compiled version of the schema definition that maps directly to a single document in a MongoDB collection. An instance of a model is called a document.

// Mongoose models are responsible for querying, creating, updating, and removing documents from the MongoDB database.

// The first parameter is the singular name of the collection you need a model for, and the second parameter is the schema definition. Mongoose will automatically pluralize and lowercase the name of the collection you specified.

// For example, for the above Book model, the actual name of the MongoDB collection will be books. To retrieve all books using the Mongo Shell, you would use the db.books.find() command.

// https://attacomsian.com/blog/mongoose-models

module.exports = mongoose.model('Category', categorySchema);
