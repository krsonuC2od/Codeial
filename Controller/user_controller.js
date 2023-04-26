const User = require("../Models/user");
// step 2 part of controller create controller of user profile page

module.exports.profile = function (req, res) {
  return res.render("userProfile");
};
// step 2 part of controller create controller of user post page
module.exports.post = function (req, res) {
  return res.end("<h1>Welcome to post section</h1>");
};

module.exports.userSign_Up = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }


  res.render("userSign_Up", {
    title: "Codeial",
  });
};

module.exports.userSign_In = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
  res.render("userSign_In", {
    title: "Codeial",
  });
};

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

        return res.redirect("/user/sign-In");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign in and create session for user
module.exports.createSession = function(req,res){
  return res.redirect('/');
}


module.exports.destroySession = function(req,res){
  // req.logout();
  // return res.redirect('/');
}