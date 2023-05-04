const Post = require("../Models/post");
const Comment = require('../Models/comment');

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error: creating new post");
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function(req,res){
  Post.findById(req.params.id,function(err,post){
    //.id means converting the object id into string
    if(post.user == req.user.id){
      post.remove();
      Comment.deleteMany({post: req.params.id}, function(err){
        return res.redirect('back');
      });
    }else{
      return res.redirect('back');
    }
  })
}