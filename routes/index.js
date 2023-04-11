const express = require('express')
const route= express.Router();
const homeController =require('../Controller/home_controller');
const router = require('./user');


console.log("router  is loaded");

route.get('/',homeController.home);
route.use('/user',require('./user'));





module.exports=route;