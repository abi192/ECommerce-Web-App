const mongoose = require('mongoose');
const User = new mongoose.model( require('../models/users').model_Name );
const Product = mongoose.model(require('../models/products').model_Name);
const productController = require('./products');

exports.addUser = function(user){
    const newUser = new User(user);
    return newUser.save();
};

exports.addProduct = async function(email,product){
    let user = await User.findOne({email:email}).exec();
    if(!user)
        return;
    user.products.push(product);
    return user.save();
};

exports.getUserByemail = function(email){
    return User.findOne({email}).exec();
}

exports.updateProduct = async function(email,productId,product){
    const user = await User.findOne({email}).exec();
    for(let i=0;i<user.products.length;i++){
        if(productId==user.products[i]._id){
            user.products[i] = product;
            return user.save();
        }
    }
};

exports.deleteProduct = async function(email,productId){
    const user = await User.findOne({email}).exec();
    for(let i=0;i<user.products.length;i++){
        if(productId==user.products[i]._id){
            // remove 'n' no. of elements from 'i' index
            user.products.splice(i,1);
            return user.save();
        }
    }
};


// CART FUNCTIONS

exports.addToCart = async function(email,productId){
    const user = await User.findOne({email}).exec();
    user.cart.push(productId);
    return user.save();
}

exports.getCart = async function(email){
    const user = await User.findOne({email}).exec();
    let cartProducts = [];
    for(let i=0;i<user.cart.length;i++){
        const product = await Product.findById(user.cart[i]);
        if(product)
            cartProducts.push(product);
    }

    return cartProducts;
}

exports.removeFromCart = async function(email,productId){
    const user = await User.findOne({email}).exec();
    for(let i=0;user.cart.length;i++){
        if(user.cart[i] == productId){
            user.cart.splice(i,1);
            break;
        }   
    }
    return user.save();    
}

