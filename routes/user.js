// step 2 use express module
const express = require('express');
// step 2 use  express router 
const route=express.Router();

// step 2 use  user controller from controller 
const userController =require('../Controller/user_controller')

const passport = require('passport');

//  step 2 call user profile
route.get('/profile',passport.checkAuthentication, userController.profile)

//step 2 call user post
route.get('/post',userController.post);


// routing user signUp form
route.get('/sign-Up',userController.userSign_Up);

// routing user signIN form
route.get('/sign-In',userController.userSign_In);

route.post('/create',userController.create);


route.post('/create-Section',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-In'},
),userController.createSession);

route.post('/create-Section',userController.createSection);



route.get('/sign-out',(req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  },userController.destroySession);


// step 2 export router
module.exports=route;