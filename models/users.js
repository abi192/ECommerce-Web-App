const mongoose = require('mongoose');
const productSchema = require("./products").productSchema;
const model_Name = 'User';

const UserSchema = new mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    email: {
        type:'String',
        required:true,
        unique:true
    },
    password:{
        type:'String',
        required:true,
    },
    products:[productSchema],
    cart:[String]
});

mongoose.model(model_Name,UserSchema);
module.exports = {model_Name};