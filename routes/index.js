// step 2use express module
const express = require('express')
// step 2 use express router module
const route= express.Router();
// step 2 use homeController
const homeController =require('../Controller/home_controller');
const router = require('./user');



console.log("router  is loaded");
// step 2  call home through Controller
route.get('/',homeController.home);

// step 2  call user through Controller
route.use('/user',require('./user'));
route.use('/post',require('./post'));




// step 2 export router
module.exports=route;