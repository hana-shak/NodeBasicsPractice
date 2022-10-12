const Product = require('../models/product');

const getAddProduct = (req, res, next)=>{ 
    res.render('admin/edit-product',
      {
          pageTitle:'Add Product', 
          path:'/admin/add-product',
          editing:false,
      }
      )
};

const postAddProduct = (req, res, next)=>{
    
    //const id  = null; 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null,title, imageUrl, price, description); 
    product.save()
           .then(()=> { res.redirect('/') })
           .catch((err)=>{console.log(err)});
    }; 


//with using EditProduct & query parameters
const getEditProduct = (req, res, next) => { 
    const editMode = req.query.edit;
    // if(!editMode){
    //     return res.redirect('/'); 
    // }
    // console.log(req.params)
    const prodId = req.params.productId; 
    Product.findById(prodId, product =>{
        //console.log(prodId)
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',
      {
          pro : product,
          pageTitle:'Edit Product', 
          path:'/admin/edit-product/product.id',
          editing : editMode, 
    } 
     )
    });
};

const postEditProduct = (req, res, next) => {
      const prodID = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedImageUrl = req.body.imageUrl;
      const updatedPrice = req.body.price;
      const updatedDesc = req.body.description;
      const updatedProduct = new Product(prodID, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
      updatedProduct.save();  
      res.redirect('/products');
  
};

const postDeleteProduct = (req, res, next) =>{
    const prodID = req.body.deleteID;
    Product.deleteById(prodID);
    res.redirect('/admin/products')
}

const getProducts = (req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products',
        { 
          prods: products, 
          pageTitle:'Admin Products', 
          path:'/admin/products'
        });
    });
 }
     


module.exports = {
    getAddProduct,
    getProducts,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct };

