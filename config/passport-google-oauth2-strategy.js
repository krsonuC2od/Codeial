const User = require('../Models/user')
const passport = require('passport');
const crypto = require('crypto');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const crypto = require('../Models/user');

//tell passport to use a  new strategy for google login
passport.use(new googleStrategy({
    clientID: '21456182402-lsqd32iqgma30fa6s27sabfecm88r27v.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/user/auth/google/callback',
},
function (accessToken,refreshToken,profile,done){
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy-passport',err);
            return;
        }
        console.log(profile);

        if(user){
          //if user found create the user as req.user
          return done(null , user);
        }else{
          User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password: crypto.randomBytes(32).toString('hex')
            
          }, function (err ,user ){
            if(err){
              console.log('error in creating user google strategy-passport',err);
              return;
          }
          return done(null , user);
          })
        }
    })
}
))

module.exports = passport;