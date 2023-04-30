const Post = require('../Models/post');
const { post } = require('../routes/post');
// step 2 part of controller create controller of home page
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  //  return res.end('<h1>Controller is working</h1>')
  // Post.find({},function(err,posts){
  //   return res.render("home", {
  //     title: "Codeial | Home",
  //     posts:posts
  //   });
  // });

  Post.find({}).populate('user').exec(function(err,posts){
    return res.render("home", {
      title: "Codeial | Home",
      posts:posts
    });
  });
}



// module.exports.createSession = function (req, res) {};
