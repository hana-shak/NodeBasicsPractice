// const products = []; 
const Product = require('../models/product');
const Cart = require('../models/cart');
//const adminProduct = require('../routes/admin')

//here will read/retrive from file
const getProducts = (req, res, next)=>{
  //  Product.findAll()
  req.user.getProducts()
           .then((result) => {
           
            {res.render('shop/shop',
           { 
             prods:result, 
             pageTitle:'Shop', 
             path:'/products'
           }
           )}
          })
           .catch(err => {console.log(err)});
  /**  SQL Intro Solution
  Product.fetchAll()
         .then(([result]) => { 
           //console.log(result);
           //the error was the .sth not same that used in object
          res.render('shop/shop',
              { 
                prods:result, 
                pageTitle:'Shop', 
                path:'/products'
              }
              );
         })
         .catch(err => {console.log(err)})
     */
    // Product.fetchAll((products)=>{
    //   // console.log(products)
    //     res.render('shop/shop',
    //     { 
    //       prods: products, 
    //       pageTitle:'Shop', 
    //       path:'/products'
    //     }
    //     );
    // }); 
  };
        //here will choice the default template that i set it up,
        // pug & will look to .pug file extension from view
//

const getProduct = (req, res, next) => {
   //productId => is the value transfered in the router
   const prodID = req.params.productId;
   //after adding the findById static method in model file, now we can use it
   console.log(prodID);
   /** 
   Product.findById(prodID, product =>  
    res.render('shop/product',{
      
      productValue : product,
      pageTitle : product.title,
      path : "/product/product.id"
      })
      
    );
   */
    //console.log(prodID);
    Product.findByPk(prodID)
           .then((product)=>{
             console.log(product)
            res.render('shop/product',{
            
              productValue : product,
              pageTitle : product.title,
              path : "/product/product.id"
              })
              
           })
           .catch(err => {console.log(err)})
 }

const getIndex = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
  .then(products => {
    // console.log(products)
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }
  ).catch(err => {console.log(err)})
 

    // Product.fetchAll(products => {
    //   res.render('shop/index', {
    //     prods: products,
    //     pageTitle: 'Shop',
    //     path: '/'
    //   });
    // });
  };
  
  const getCart = (req, res, next) => {
    Cart.fetchCartItems(cart => {
      //console.log(cart.products.find(prod => prod.id == product.id));
      const cartProducts = [];
       Product.fetchAll(pro => {
         //looping through products in 
        for(product of pro){
          const productData = cart.products.find(prod => prod.id == product.id);
           if(productData){
            cartProducts.push({products:product, qty: productData.qty})

           }
        }
        //console.log(cartProducts[0].products);
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          items : cartProducts, //array of objects
          // {
          // id: '0.3807311497144077 ',
          // title: 'Second Product',
          // imageUrl: 'https://100wardeh.com/media/catalog/product/cache/8165964517bb6de0280ae4d6b8891bec/1/8/18_rose_red_and_pink.jpg',
          // price: '888888',
          // description: 'I love Node.JS & appreciate what I am doing' 
          //}
       
/*
[{
    products: {
      id: '0.3807311497144077 ',
      title: 'Second Product',
      imageUrl: 'https://100wardeh.com/media/catalog/product/cache/8165964517bb6de0280ae4d6b8891bec/1/8/18_rose_red_and_pink.jpg',
      price: '888888',
      description: '                     I love Node.JS & appreciate what I am doing, Alhamdollah     \r\n' +
        '                '
    },
    qty: 1
  }]
*/
        });
       })  
    });
  };
 

 

  const postingAddToCart = (req,res,next) => {
          const productId = req.body.productId; 
          //getting the product price & cart method/ processed 
          Product.findById(productId, product => {
            console.log(product)
             Cart.addToCart(productId, product.price)
                
          })
          //console.log('req.body.productId contaions',req.body.productId);
          res.redirect('/cart');
        // res.render('shop/cart',{
        // })
  };

  const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  };


  //needs a review as a strutegy 
  const postDeleteProduct = (req, res, next) => {
      const proId = req.body.proID;
      Product.findById(proId, (product) => {
        Cart.deleteProduct(proId, product.price);
        res.redirect('/cart');
      })
  };

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getProduct,
    postingAddToCart,
    postDeleteProduct
}
