
const express = require('express')
const app =express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));

app.set("view engine", "ejs");
app.set("views",'./views');

app.use('/',require('./routes'))










app.listen(port,function(err){
    if(err){
        console.log('error');
    }
    console.log(port);
})