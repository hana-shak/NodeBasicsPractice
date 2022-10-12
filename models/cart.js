const fs = require('fs');
const path = require('path');
const pt = require('../util/path');

const p = path.join(pt, 'data', 'cart.json');


module.exports = class Cart{
    
    static addToCart(id, productPrice){
        
        //fetch the previous cart
       fs.readFile(p, (err, fileContent)=>{
        let cart = { products:[], totalPrice: 0};
         //if no error means there is a response & fileContent and fileContent may have data inside it & may not
         //if err = 1 there is error in reading the file
           if(!err){
              
            cart = JSON.parse(fileContent);
           }
           //Analyze the cart => find productExisiting in the cart
           const productExisiting = cart.products.find(prod => prod.id === id); 
           const productExisitingIndex = cart.products.findIndex(prod => prod.id === id); 
           //Add a new product/ increase quantity
           let updatedProduct;
           if(productExisiting){
               
               updatedProduct = {...productExisiting};
               updatedProduct.qty = updatedProduct.qty + 1; 
               //copy the original cart 
               cart.products = [...cart.products];
               //reach the product i want to change, where it is exist
               cart.products[productExisitingIndex] = updatedProduct
           }else{
            updatedProduct = { id : id, qty : 1 };
            //if it does not exist put products & add updatedProducts in the cart,
            // what if it is exist => just replace the product by updated product  
            cart.products = [...cart.products, updatedProduct]
           }
           cart.totalPrice = cart.totalPrice  + +productPrice; 
           fs.writeFile(p, JSON.stringify(cart), (err)=> {
            console.log(err)})
       })
    };

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
              return;
               }
               const updatedCart = {...JSON.parse(fileContent)};
               const product = updatedCart.products.find(prod => prod.id == id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id != id); 
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;
            fs.writeFile(p, JSON.stringify(updatedCart), (err)=>{
                console.log(err)
            })
         })     
    }

    static fetchCartItems(cb){
        
        fs.readFile(p, (err, fileContent)=>{

         if(err){
             cb(null);
         }else{
             const cart = JSON.parse(fileContent);
             cb(cart)
         }
       
        } )
    }
}