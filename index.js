const express = require('express');
const mongoose = require('mongoose');
const Session = require('express-session');
const passport = require('passport');
require('./authentication/passport-local');

const urls = require('./config');
const svr = express();
const path = require('path');

svr.use(express.json());
svr.use(express.urlencoded({extended:true}));
svr.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
});
svr.use(express.static( path.join(__dirname,"views") ));

svr.use(Session({
    secret:"This is secret",
    resave:false,
    saveUninitialized:true
}));
svr.use(passport.initialize());
svr.use(passport.session());

svr.use('/',require('./routes/index').route);

connectMongo(urls.mongodbURL).then(()=>{
    connectServer(urls.port);
})

function connectServer(port){
    svr.listen(port,(err)=>{
       if(err)
           console.log(err);
       else
           console.log(`Server connected to http://localhost:${port}`);
    });
}

function connectMongo(url){

    mongoose.connection.on('error', (err)=>{
        console.error(err);
        console.error("Error in connecting database");
     });

     mongoose.connection.once('open',()=>{
         console.info("Database Connected")
     });

     return mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true } );
}
