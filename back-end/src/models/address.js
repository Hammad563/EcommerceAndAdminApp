const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    pinCode: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 100
    },
    locality: {
        type: String,
        trim: true,
        min: 10,
        max: 100
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
    },
    addressType: {
        type: String,
        required: true,
        enum: ['home', 'work'],
        required: true
    }
   

});

const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address: [addressSchema]
}, {timestamps: true})


module.exports = mongoose.model('UserAddress', userAddressSchema);