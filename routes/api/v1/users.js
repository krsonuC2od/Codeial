const express = require('express');
const router = express.Router();
const passport = require('passport');
const userApi  = require('../../../Controller/api/v1/users_api');


router.post('/create-session',passport.authenticate('jwt',{session:false}),userApi.createSession);





module.exports = router;