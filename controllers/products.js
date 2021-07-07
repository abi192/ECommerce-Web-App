const mongoose = require("mongoose");
const Product = mongoose.model(require('../models/products').model_Name);

exports.getAll = function(){
    return Product.find({}).exec();
};

exports.getById = function(id){
    return Product.findById(id).exec();
}

exports.add = function(sellerId,product){
    product.sellerId=sellerId;
    const newProduct = new Product(product);
    return newProduct.save();
};

exports.update = function(id,product){
    return Product.findByIdAndUpdate(id, product, {new : true, useFindAndModify:true}).exec();
};

exports.delete = function(id){
    return Product.findByIdAndDelete(id, {useFindAndModify:true} ).exec();
};