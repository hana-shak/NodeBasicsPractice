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
    req.user
        .createProduct({
        title:title,
        imageUrl:imageUrl,
        description:description,
        price:price,
        })
        .then((result) => { 
               //console.log('Product Created','result',result)
               res.redirect('/admin/products') })
        .catch( err => { console.log(err)})
    }
    // const product = new Product(null,title, imageUrl, price, description); 
    // product.save()
    //        .then(()=> { res.redirect('/') })
    //        .catch((err)=>{console.log(err)});
    // }; 


//with using EditProduct & query parameters
const getEditProduct = (req, res, next) => { 
    const editMode = req.query.edit;
    // if(!editMode){
    //     return res.redirect('/'); 
    // }
    // console.log(req.params)
    const prodId = req.params.productId; 
    //console.log('prodId = req.params.productId',req.params.productId)
    req.user.getProducts({where : { id : prodId }})
           
           .then(
            products =>{
                const product = products[0];
                    //console.log(prodId)
                    //console.log('prodId = req.params',req.params)
                    if(!product){
                        return res.redirect('/');
                    }
                    res.render('admin/edit-product',
                  {
                      pro : product,
                      pageTitle:'Edit Product', 
                      path:'/admin/edit-product/product.id',
                      editing : editMode, 
                })
                })
           .catch(err => {console.log(err, "product",product)})
    /* SQL Intro
    // Product.findByPk(prodId, product =>{
    //     //console.log(prodId)
    //     if(!product){
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product',
    //   {
    //       pro : product,
    //       pageTitle:'Edit Product', 
    //       path:'/admin/edit-product/product.id',
    //       editing : editMode, 
    // } 
    //  )
    // });
    */
};

const postEditProduct = (req, res, next) => {
      const prodID = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedImageUrl = req.body.imageUrl;
      const updatedPrice = req.body.price;
      const updatedDesc = req.body.description;
      const prodId = req.params.productId;
      //console.log('req',req) 
      console.log('req.params ',req.params) 
      //console.log('req.body ',req.body.productId) 
    //   console.log('req.params.productId = prodId',req.params.productId) 
    //   console.log('req.body.productId = prodID',req.body.productId) 
      Product.findByPk(prodID)
             .then((product) => {
                 console.log(Product.findByPk(prodID))
                 console.log("product instanceof Product",product instanceof Product); 
                 console.log("project.title",product.title)
                 product.title = updatedTitle;
                 product.price = updatedPrice;
                 product.imageUrl = updatedImageUrl;
                 product.description = updatedDesc;
                 return product.save();
             })
             .then(result => {
                  console.log("result",result);
                  res.redirect('/products')
                })
             .catch(err => {console.log(err)})
      
    //   const updatedProduct = new Product(prodID, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
    //   updatedProduct.save();  
    //   res.redirect('/products');
  
};

const postDeleteProduct = (req, res, next) =>{
    const prodID = req.body.deleteID;
    Product.findByPk(prodID)
           .then(product => {
               product.destroy();
               res.redirect('/admin/products')
           })
           .catch(err => {console.log(err)})
    // Product.deleteById(prodID);
    // res.redirect('/admin/products')
}

const getProducts = (req, res, next)=>{
     req.user.getProducts()
             .then(
                result => {
                    res.render('admin/products',
                    { 
                      prods: result, 
                      pageTitle:'Admin Products', 
                      path:'/admin/products'
                    })
                    }
             )
            .catch(err => {console.log(err)})
    //  Product.findAll()
    //         .then(result => {
    //          res.render('admin/products',
    //          { 
    //            prods: result, 
    //            pageTitle:'Admin Products', 
    //            path:'/admin/products'
    //          })
    //          })
    //         .catch(err => {console.log(err)});
    
    // Product.fetchAll((products)=>{
    //     res.render('admin/products',
    //     { 
    //       prods: products, 
    //       pageTitle:'Admin Products', 
    //       path:'/admin/products'
    //     });
    // });
    
}  


module.exports = {
    getAddProduct,
    getProducts,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct };

