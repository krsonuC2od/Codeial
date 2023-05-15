const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../Models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}
passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){
    User.findOne(jwtPayLoad._id, function(err,user){
        if(err){console.log('Error in finding user from Jwt'); return; }
   
        if(user){
            return done(null,user);
        }else{
          return done(null,false);
        }
    })
}))

module.exports = passport;