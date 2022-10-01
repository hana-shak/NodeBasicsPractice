const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

//from controllers folder
const  {addProductRouter} = require('../controllers/products');
const { addingProcess} =  require('../controllers/products');

const router = express.Router();
//const products = []; 


router.get('/add-product', addProductRouter);
router.post('/add-product', addingProcess );

exports.router = router; 

//OLD STRUCTURE
// router.get('/add-product',(req, res, next)=>{
//     console.log("first middleware");
//     //this is the begining was
//     // res.send('<form action="/admin/product" method="POST"><input type="text" name="msg"> <button type="submit">Send</button> </form>');
//     //New method is __dirname is the root folder we are in,to get the path for this file's folder, ../ => go up one level, path creates path by putting join methid that concatinating segments
//     //res.sendFile(path.join(__dirname,'../','views','admin.html'));
//     //res.sendFile(path.join(rootDir,'views','add-product.html'));
//     //using pug template
//     res.render('add-products',{pageTitle:'Add Product', path:'/admin/add-product'})
// })

// router.post('/add-product',(req, res, next)=>{
//     products.push({title : req.body.title})
//     console.log(req.body);
//     res.redirect('/');
// })

// exports.products = products; 