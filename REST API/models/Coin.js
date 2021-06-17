const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const coinSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
  
    description:{
        type: String,
        required: true
    },
    sallesman: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    buyers:[
        {
            type: ObjectId,
            ref: 'User'
        }
    ]         


});

module.exports = new Model('Coin', coinSchema);