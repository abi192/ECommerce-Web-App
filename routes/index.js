const route = require('express').Router();
const path = require('path');
const passport = require('passport');
const userController = require('../controllers/users');
const {isLogin, isLogout} = require('./helper');

route.use('/user',isLogin, require('./users').route );
route.use('/products',isLogin,require('./products').route );

route.get('/login',isLogout,(req,res)=>{
    res.sendFile(path.join( __dirname, "../views/html/login.html"));
});

route.get('/register',isLogout,(req,res)=>{
    res.sendFile(path.join( __dirname, "../views/html/register.html"));
});

route.post('/login',passport.authenticate('local',{
    successRedirect:'/user',
    failureRedirect:'/login'})
);

route.post('/register',(req,res)=>{
    if(req.body.password !== req.body.confirmpassword)
        return res.json("error: Passwords does not match");
    userController.addUser(req.body).then(()=>{
        return res.redirect('/login');
    }).catch((e)=>{
        console.log(e);
        res.json("error: user already exist");
    });
});

module.exports = {route};