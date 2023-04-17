module.exports.profile=function(req,res){
    return res.render('userProfile');
}

module.exports.post=function(req,res){
    return res.end('<h1>Welcome to post section</h1>')
}