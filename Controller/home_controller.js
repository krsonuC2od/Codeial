module.exports.home=function(req,res){
  //  return res.end('<h1>Controller is working</h1>')
 return res.render('home',{
    title:"Codeial"
  })
}