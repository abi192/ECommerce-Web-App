const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = new mongoose.model(require('../models/users').model_Name);

const fields = {
    usernameField:'email'
};

passport.use(new LocalStrategy(fields, (email,password,done) =>{
    User.findOne({email:email}).exec().then((user)=>{
        if(!user || user.password!== password)
            return done(null,false);
        else
            return done(null,user);
    });
}));

passport.serializeUser((user,done)=>{
    done(null, user._id);
}); 

passport.deserializeUser((id,done)=>{
    User.findById(id).exec().then((user)=> done(null,user));
});
