const Comment = require('../Models/comment');
const Post = require('../Models/post');

module.exports.create = async function(req,res){
   try{ 
  let post = await Post.findById(req.body.post);
        
        if(post){
            
         let comment = await Comment.create({
             
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
                
            });
                post.comments.push(comment);
                post.save();
      req.flash('success','comment added on post');
                res.redirect('/');
          
        }
    }catch(err){
       req.flash('error',err);
       res.redirect('/');
    }
}


module.exports.destroy =  async function(req,res){
  try{
    let comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
       let postId = comment.post;
       comment.remove();
     let post = await Post.findByIdAndUpdate(postId,{$pull : {comments: req.params.id}});
     req.flash('success','Comment is Deleted !');
        return res.redirect('back');
       }else{
         req.flash('error','you can not delete this Comment');
         return res.redirect('back');
    }
 }catch(err){
    req.flash('error',err);
    return ;
 }  
}