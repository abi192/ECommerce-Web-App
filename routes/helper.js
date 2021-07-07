const userController = require('../controllers/users');

function isLogin(req,res,next){
    if(req.isAuthenticated())
        return next();
    else
        // return res.redirect('/user/login');
        return res.json("error: User not authenticated");
};

function isLogout(req,res,next){
    if(!req.isAuthenticated())
        next();
    else
        // return res.redirect('/user/home');
        return res.json("error: User already authenticated");
};

async function isProductinUser(email,productId){
    await userController.getUserByemail(email).then((user)=>{
        const products = user.products;
        for(let i=0;i<products.length;i++){
            if(productId==products[i]._id)
                return true;
        }
        return false;
    });
};

module.exports = {isLogin, isLogout, isProductinUser};