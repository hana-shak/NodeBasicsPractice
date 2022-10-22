const http = require('http');
const express = require('express');
const bodyparsere = require('body-parser');
const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');
const path = require('path');
const app = express(); 
const rootDir = require('./util/path');
const {errorController} = require('./controllers/error');

const sequelize = require('./util/dbsql');
const Product = require('./models/product');
const User = require('./models/user');
const { use } = require('./routes/shop');



// db.execute('SELECT * FROM Products')
//   .then(([result])=>{console.log('result',result)})
//   .catch((err)=>{console.log(err)})

app.use(bodyparsere.urlencoded({extended : false}));

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views','views');



// app.use('/',(req, res, next)=>{
//     console.log("first middleware");
//     next();
// })

app.use(express.static(path.join(__dirname, 'public'))); 

//npm start will not start or return the user in the middle ware,
// it is just register/restore the middle ware
app.use((req, res, next)=>{
    User.findByPk(1)
        .then((user) => {
            req.user = user; 
            next();
        })
        .catch((err) =>{console.log(err)})
})


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

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

// { force: true }
// Create user manually 
sequelize.sync()
         .then(result => { 
             return User.findByPk(1) })
         .then(user => {
             if(!user){
                 return User.create({name:"Hana", email:"hana@test.com"})
                }
                //it is an object which equals to an promise in javascript
                return user; 
            })
         .then((user)=>{
               console.log(user)
               app.listen(3000)})
        .catch( err => {console.log(err)})



