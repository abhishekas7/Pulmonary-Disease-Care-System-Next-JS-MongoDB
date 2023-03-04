
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './model/UserModel';
import bcrypt from 'bcrypt'

module.exports = function(passport){

    passport.use(
        new LocalStrategy((email,password,done)=>{
            User.findOne({email:email},(err,user)=>{
                if (err) throw err;
                if(!user) return done (null,false);
                bcrypt.compare(password.user.password,(err,result)=>{
                    if (err) throw err;
                    if(result==true){
                        return done (null,user)
                    }
                    else{
                        return done (null,false);
                    }
                })
            })
        })
    );
passport.serializeUser((user,cb)=>{
    cb(null, user.id);
})
passport.deserializeUser((id,cb)=>{
    User.findOne({_id:id},(err,user)=>{
        cb(err,user);
    })
})
};

// Configure the local strategy
passport.use(new LocalStrategy(User.authenticate()));

// Serialize and deserialize user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());