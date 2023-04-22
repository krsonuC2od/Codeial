
// step 2 part of controller create controller of home page
module.exports.home = function (req, res) {
  console.log(req.cookies);
  //  return res.end('<h1>Controller is working</h1>')
  return res.render("home", {
    title: "Codeial",
  });
};



module.exports.createSession = function (req, res) {};
