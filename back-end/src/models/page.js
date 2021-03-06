const mongoose = require('mongoose');
const slugify = require('slugify');


const pageSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    banners: [
        {
            img: {type: String,},
            navigateTo:  {type: String}
        },
    ],
    products: [
        {
            img: {type: String,},
            navigateTo:  {type: String}
        },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        unique: true
    }

}, {timestamps:true});

module.exports = mongoose.model('Page', pageSchema);