const express = require('express')
const port=8000;
const app =express();

app.use('/',require('./routes'))










app.listen(port,function(err){
    if(err){
        console.log('error');
    }
    console.log(port);
})