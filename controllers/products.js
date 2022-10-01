// const products = []; 
const Product = require('../models/product');

const adminProduct = require('../routes/admin')


const getAddProduct = (req, res, next)=>{ 
    res.render('add-product',
      {
          pageTitle:'Add Product', 
          path:'/admin/add-product'
      }
      )
}

//here will write into file
const postAddProduct = (req, res, next)=>{
   // products.push({title : req.body.title})
    const product = new Product(req.body.title); 
    product.save();
    
    res.redirect('/');
};

//here will read/retrive from file
const getProducts = (req, res, next)=>{
   

    Product.fetchAll((products)=>{
        res.render('shop',
        { 
          prods: products, 
          pageTitle:'Shop', 
          path:'/'
        }
        );
    }); 
     
        //here will choice the default template that i set it up,
        // pug & will look to .pug file extension from view
}



module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts
}
