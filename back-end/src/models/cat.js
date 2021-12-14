const mongoose = require('mongoose');
const slugify = require('slugify');


const catSchema = new mongoose.Schema({

    name:{
            type: String,
            required: true,
            trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },

    type: {
        type: String,
    },
    categoryImage: {
         type: String
     },

    parentId: {
        type: String
    }


}, {timestamps:true});

module.exports = mongoose.model('Cat', catSchema);