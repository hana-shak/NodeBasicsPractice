const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

//from controllers folder

const {getAddProduct,
       postAddProduct, 
       getProducts,
       getEditProduct,
       postEditProduct,
       postDeleteProduct  } =  require('../controllers/admin');

const router = express.Router();
//const products = []; 

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct );


// /admin/edit-product => GET
router.get('/edit-product/:productId', getEditProduct );

// /admin/edit-product => POST
router.post('/edit-product', postEditProduct);

// /admin/delete-product => POST
router.post('/delete-product', postDeleteProduct );

// /admin/products => GET
router.get('/products', getProducts);



//OLD STRUCTURE
//  router.get('/add-product',(req, res, next)=>{
//     console.log("first middleware");
//     //this is the begining was
//     // res.send('<form action="/admin/product" method="POST"><input type="text" name="msg"> <button type="submit">Send</button> </form>');
//     //New method is __dirname is the root folder we are in,to get the path for this file's folder, ../ => go up one level, path creates path by putting join methid that concatinating segments
//     //res.sendFile(path.join(__dirname,'../','views','admin.html'));
//     //res.sendFile(path.join(rootDir,'views','add-product.html'));
//     //using pug template
//    res.render('add-product',{pageTitle:'Add Product', path:'/admin/add-product'})
// })

//  router.post('/add-product',(req, res, next)=>{
//      products.push({title : req.body.title})
//      console.log(req.body);
//     res.redirect('/');
//  })

 exports.router = router; 

 //exports.products = products; 