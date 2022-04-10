const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid').v1;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 50
        },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true,
            maxlength: 250
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

// virtual field

userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuid();
        this.hashed_password = this.encryptPassword(password);
    })
    .get( function () {
        return this._password;
    });

userSchema
    .methods = {
    authenticate: function ( plainText ) {
            return this.encryptPassword( plainText ) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                // one of many methods to hash a password
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model( 'User', userSchema );
