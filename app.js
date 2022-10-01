const http = require('http');
const express = require('express');
const bodyparsere = require('body-parser');
const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');
const path = require('path');
const app = express(); 
const rootDir = require('./util/path');
const {errorController} = require('./controllers/others')


app.use(bodyparsere.urlencoded({extended : false}));

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views','views');

// app.use('/',(req, res, next)=>{
//     console.log("first middleware");
//     next();
// })

app.use(express.static(path.join(__dirname, 'public'))); 

//These are middlewares handler data 
app.use('/admin', adminRouters.router );  //order is important 

app.use(shopRouters); 

app.use(errorController); 
// app.use((req, res, next)=>{
//    // First solution
//    //res.status(404).send('<h1>Wrong Ya kbeeeer</h1>');
//    //res.status(404).sendFile(path.join(__dirname,'views','error.html'));
//    //res.status(404).sendFile(path.join(rootDir,'views','404.html'))
//    res.status(404).render('404',{ pageTitle : 'Not Found', path});

// })
// const server = http.createServer(app);
// http.Server.listen(3000)

app.listen(3000);