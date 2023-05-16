const express = require('express');
const router = express.Router();
const passport = require('passport');
const userApi  = require('../../../Controller/api/v1/users_api');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// function customMiddleware(req,res,next){
//     // console.log(req, " result*****");
  
//    console.log( ExtractJWT.fromAuthHeaderAsBearerToken(), " Token ***");
//     next();

// }
router.post('/create-session',passport.authenticate('jwt',{session:false})
,userApi.createSession);

// 




module.exports = router;