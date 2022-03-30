const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid/v1');
const { stringify } = require('querystring');

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
