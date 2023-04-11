const express = require('express');
const route=express.Router();

const user =require('../Controller/user_controller')

route.get('/profile',user.profile)
route.get('/post',user.post)




module.exports=route;