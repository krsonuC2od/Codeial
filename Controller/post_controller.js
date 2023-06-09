const Post = require("../Models/post");
const Comment = require('../Models/comment');

module.exports.create = async function (req, res) {

  try{
   let post= await Post.create(
      {
        content: req.body.content,
        user: req.user._id,
      });

      if(req.xhr){
        return res.status(200).json({
          data:{
            post : post,
            username:req.user.name
          },message:"Post Created"
        })
      }
      req.flash('success','post publish Successfully');
    return res.redirect("back");
  }catch(err){
   req.flash('error',err);
   return res.redirect("back");
  }
 };

module.exports.destroy =  async function(req,res){
  try{
  let post = await Post.findById(req.params.id);
    //.id means converting the object id into string
      if(post.user == req.user.id){
        post.remove();
      await  Comment.deleteMany({post: req.params.id});

      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id : req.params.id
          },message:"Post deleted"
        })
      }
      req.flash('success','post and associated comment deleted.!');
          return res.redirect('back');
        
      }else{
        req.flash('error','you can not delete this post');
        return res.redirect('back');
      }
  
}catch(err){
  req.flash('error',err);
  return res.redirect('back');
}
}