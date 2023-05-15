// Step 1st create express server and run on port 8000
const express = require('express')
const app =express();
const port=8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
//step 2 use mongoose db in express 
const db =require('./config/mongoose');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-Strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
  src: './assets/scss',
  dest:'./assets/CSS',
  debug:'true',
  outputStyle: 'expanded',
  prefix: '/CSS'  
}))

app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// step 2 set path of static folder
app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/Uploads' ));


//  step 2 set view engine for views file
app.set("view engine", "ejs");
app.set("views",'./views');
//mongo store is used to store the session cookie in the db


app.use(session({
    name:'codeial',
    //Todo latter 
    secret:'Anything',
    saveUninitialized:false,
    resave : false,
    cookie:{
        maxAge:( 1000 * 60 * 100)
    },
    store : new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok ');
        },
        
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// step 2 set path of router in express 
app.use('/',require('./routes'))









//  Step 1st  Run express server With port 8000
app.listen(port,function(err){
    if(err){
        console.log('error');
    }
    console.log(port);
})