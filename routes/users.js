const route = require('express').Router();
const path = require('path'); 

// view home page of user
route.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/html/home.html'));
});

// Logout the user
route.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/login');
});

// view add product page
route.get('/add-product',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/html/add-product.html'));
});

// view products added by user
route.get('/my-products',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/html/my-products.html'));
});

// view edit product page
route.get('/edit-product/:id', (req,res)=>{
    res.sendFile(path.join(__dirname,'../views/html/edit-product.html'));
});

// view username on each page
route.get('/FullName',(req,res)=>{
    res.json(req.user.name);
});

// view cart of the user
route.get('/cart', (req,res)=>{
    return res.sendFile(path.join(__dirname,'../views/html/cart.html'));
});


module.exports ={route};