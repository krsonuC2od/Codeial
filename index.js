
// Step 1st create express server and run on port 8000
const express = require('express')
const app =express();
const port=8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// step 2 set path of static folder
app.use(express.static('./assets'));

//step 2 use mongoose db in express 
const db =require('./config/mongoose');
//  step 2 set view engine for views file
app.set("view engine", "ejs");
app.set("views",'./views');

// step 2 set path of router in express 
app.use('/',require('./routes'))









//  Step 1st  Run express server With port 8000
app.listen(port,function(err){
    if(err){
        console.log('error');
    }
    console.log(port);
})