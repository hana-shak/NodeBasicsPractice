const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const { getProducts,
        getIndex,
        getCart,
        getCheckout,
        getProduct,
        postingAddToCart,
        postDeleteProduct } = require('../controllers/products')

const router = express.Router();
// const adminProduct = require('./admin')

router.get('/', getProducts);

router.get('/index', getIndex);


//product/productID => GET,,,using : inside router in express to put dynamic param 
router.get('/product/:productId', getProduct);

router.get('/products',getProducts);


router.get('/cart',getCart);

//add to cart =>  POST 
router.post('/cart', postingAddToCart)

router.get('/checkout',getCheckout );

//delete product from cart
router.post('/deleteProduct', postDeleteProduct);


//router.get('/',(req, res, next)=>{
    //console.log('shop.js page now', adminProduct.products[0].title)
    //console.log("Second middleware!!!");
    //res.send('<h1>hello ya</h1>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    //const products =  adminProduct.products;
     
 //   res.render('shop',{prods: products, pageTitle:'Shop', path:'/'}); //here will choice the default template that i set it up, pug & will look to .pug file extension from view
//})

module.exports = router; 