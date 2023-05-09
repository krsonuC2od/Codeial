const { populate } = require('../Models/post');
const Post = require('../Models/post');
const User  =require('../Models/user');
const { post } = require('../routes/post');
// step 2 part of controller create controller of home page
module.exports.home = async function (req, res) {
 
  try { 
    //populate the user of each post 
  let posts = await  Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  })
  
  
    let users = await  User.find({});
    return res.render("home", {
      title: "Codeial | Home",
      posts:posts,
      all_users:users
    });
  }catch(err){
    console.log('Error' , err);
    return;
  }
}



// module.exports.createSession = function (req, res) {};
