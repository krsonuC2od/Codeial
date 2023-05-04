const Comment = require('../Models/comment');
const Post = require('../Models/post');

module.exports.create = function(req,res){
    console.log(req.body.post);
    Post.findById(req.body.post,function(err,post){
         if(err){console.log("err")}
        if(post){
            
            Comment.create({
             
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
                
            },
            
            function(err,comment){
                // if(err){console.log("Error: Creating on new Comment..")}
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
   
}

module.exports.destroy = function(req,res){
 Comment.findById(req.params.id, function(err, comment){
    if(comment.user == req.user.id){
       let postId = comment.post;
       comment.remove();
       Post.findByIdAndUpdate(postId,{$pull : {comments: req.params.id}}, function(err,post){
        return res.redirect('back');
       }) 
    }else{
         return res.redirect('back');
    }
 })   
}