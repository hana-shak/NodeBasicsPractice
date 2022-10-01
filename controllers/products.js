const products = []; 

const addProductRouter = (req, res, next)=>{ 
    res.render('add-products',{pageTitle:'Add Product', path:'/admin/add-product'})
}

const addingProcess = (req, res, next)=>{
    products.push({title : req.body.title})
    res.redirect('/');
};



module.exports = {
    addProductRouter,
    addingProcess
}
