const passport = require("passport");
const User = require("../Models/user");
const LocalStrategy = require("passport-local").Strategy;

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user || user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error :: finding user --> passport");
      return done(err);
    }
    return done(null, user);
  });
});

passport.checkAuthentication = function (req ,res , next)
{
  //if the user is signed in, then pass on the request to the next function (controller's action) 
  if(req.isAuthenticated()){
    return next();
  }
  // if the user is not signed in 
  return res.redirect('/user/sign-In');
}

passport.setAuthenticatedUser = function (req , res , next){
  if(req.isAuthenticated()){
//req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
}
module.exports = passport;
