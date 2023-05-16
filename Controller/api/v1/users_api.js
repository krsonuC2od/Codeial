const User = require('../../../Models/user');
const jwt = require('jsonwebtoken');
const { use } = require('passport');

module.exports.createSession = async function(req,res){
    try{
        // if(req.isAuthenticated()){
        //     return res.json(200,{
        //         message: 'Successful Login ' 
        //     });
        // }
        // try to handle case where token is available
        let user = await User.findOne({email : req.body.email});
        console.log(req.body.email," ***** Coming from postman");
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : 'Invalid username or password'
            });
        }
        return res.json(200,{
            message:'Sign in successful , here is your token, please keep it safe !',
            data: {
                token : jwt.sign(user.toJSON(),'codeial',{expiresIn: '1000000'})
            }
        })
    
    }catch(err){
       console.log('*******',err);
       return res.json(500,{
        message : 'Internal Server Error'
       });
    }
}