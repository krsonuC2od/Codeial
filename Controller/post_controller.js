const Post = require("../Models/post");

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
