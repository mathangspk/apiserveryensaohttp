const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        min:6
    },
    description: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    images:[{
        filename: {
            type: String,
        }
    }],
    date: {
        type:Date,
        default: Date.now
    }
})

// Apply the uniqueValidator plugin to userSchema.
ProductSchema.plugin(uniqueValidator,{ message: 'Lỗi, đã có {PATH} = {VALUE}' });

module.exports = mongoose.model('Product', ProductSchema);