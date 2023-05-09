const User = require("../Models/user");

// step 2 part of controller create controller of user profile page

module.exports.profile = function (req, res) {

  User.findById(req.params.id,function(err , user){
    return res.render("userProfile", {
      title: "user||Profile",
      profile_user: user
   
    });
  });
  
};
module.exports.update = function(req , res){
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id , req.body, function(err,user){
      req.flash('success','Updated');
      return res.redirect('back');
    });
  }else{
    req.flash('error','Unauthorize');
    return res.status(401).send('Unauthorized');
  }
}

// step 2 part of controller create controller of user post page
module.exports.post = function (req, res) {
   return res.end("<h1>Welcome to post section</h1>");
  
   
};
// step :: 3 created some action for page data
module.exports.userSign_Up = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  res.render("userSign_Up", {
    title: "Codeial",
  });
};
// step :: 3 created some action for page data
module.exports.userSign_In = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  res.render("userSign_In", {
    title: "Codeial",
  });
};
// step :: 3 creating new user from sign up page data
module.exports.create = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error : In finding user by email");

      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error : In Creating new user");

          return;
        }
     req.flash('success','welcome');
        return res.redirect("/user/sign-In");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign in and create session for user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
 req.logout();
 req.flash('success' , 'you have logged out..!');
  return res.redirect('/');
};


