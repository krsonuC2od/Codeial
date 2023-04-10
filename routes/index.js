const express = require('express')
const route= express.Router();
const homeController =require('../Controller/home_controller');

console.log("router  is loaded");

route.get('/',homeController.home);




module.exports=route;