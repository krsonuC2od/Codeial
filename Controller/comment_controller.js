const Comment = require('../Models/comment');
const Post = require('../Models/post');
const commentMailer = require('../Controller/mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function(req,res){
   try{ 
  let post = await Post.findById(req.body.post);
      //   console.log(post,"*****");

        if(post){
            
         let comment = await Comment.create({

             
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
                
            });
            // console.log(comment,"***Comment****");
                post.comments.push(comment);
                post.save();
               
                comment = await comment.populate('user','name email');
               
               // commentMailer.newComment(comment);  
               let job = queue.create('emails',comment).save(function(err){
                  if(err){
                     console.log('error in creating a queue ',err);
                     return;
                  }
                  console.log('job enqueue',job.id);
               }) 
      req.flash('success','comment added on post');
                res.redirect('/');
          
        }
    }catch(err){
      console.log('calling from error');
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