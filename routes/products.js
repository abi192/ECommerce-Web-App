const route = require('express').Router();
const productController = require('../controllers/products');
const userController = require('../controllers/users');
const {isProductinUser} = require('./helper');

//CART ROUTE
route.use('/cart', require('./cart').route);

// return all products 
route.get('/',(req,res)=>{
    productController.getAll().then((products)=> res.json(products) );
});

// return products added by user
route.get('/my-products',(req,res)=>{
    userController.getUserByemail(req.user.email).then((user)=>{
        // when user in not in database
        if(!user){
            return res.json("User does not exist"); 
        }
        else{
            return res.json(user.products);
        }
    });
});

//
route.get('/:id',async (req,res)=>{
        const product = await productController.getById(req.params.id);
    return res.json(product);
});



// POST 

route.post('/',(req,res)=>{
    console.log("add");
    productController.add(req.user.email,req.body)
    .then((product)=>{
        userController.addProduct(req.user.email,product)
        .then(()=> res.redirect('/user/my-products'));
    });
});

route.post('/:id', async (req,res)=>{
    if(isProductinUser(req.user.email,req.params.id)){
        req.body.sellerId=req.user.email;
        const product = await productController.update(req.params.id,req.body);
        await userController.updateProduct(req.user.email,req.params.id,product).then((products)=>{
            return res.redirect('/users/my-products');
            // return res.redirect('/products/' + req.params.id);
        });
    }
});

route.delete("/:id",  (req,res)=>{
    if(isProductinUser(req.user.email,req.params.id)){
        userController.deleteProduct(req.user.email,req.params.id);
        productController.delete(req.params.id);
    }
    return res.redirect('/user/my-products');
    // return res.send();
});


module.exports ={route};