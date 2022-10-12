const pt = require('../util/path');
const fs = require('fs');
const path = require('path');
const p = path.join(pt, 'data', 'products.json');
const Cart = require('../models/cart');
const db = require('../util/dbsql');


// db.execute('SELECT * FROM Products')
//   .then(([result])=>{console.log('result',result)})
//   .catch((err)=>{console.log(err)})

const getProductModel = (cb) =>{
    //Ask Amin or Hasan
    fs.readFile(p, (err, fileContent)=>{
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    })
    // db.execute('SELECT * FROM Products')
    //   .then(([result])=>{console.log('result',result)})
    //   .catch((err)=>{console.log(err)})

}

// const products = []; 
//id,name,imageUrl, price ,description 

module.exports= class Product{
    constructor(id,name,imageUrl, price ,description ){
        this.id = id;
        this.title = name;
        this.imageUrl = imageUrl; 
        this.price = price;
        this.description = description;
    }
/*
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
*/
   
    
    save(){
       return db.execute(
           'INSERT INTO Products (productTitle, productPrice, productImageUrl, productDesc) VALUES ( ?, ?, ?, ?)',
           [this.title, this.price, this.imageUrl, this.description ])
       /*  BEFORE USING DB
        // const p = path.join(pt, 'data', 'products.json');
        let products = [];
        fs.readFile(p, (err, fileContent)=>{
            if(!err){
                //convert the json type into array
                products = JSON.parse(fileContent); 
            }
         
        
        if(this.id){
            const existingProductIndex = products.findIndex(p => p.id == this.id);
            console.log(existingProductIndex)
            const updatedProduct = [...products]; 
            updatedProduct[existingProductIndex] = this;
            console.log(this);
            fs.writeFile(p, JSON.stringify(updatedProduct), (err)=> {
                console.log(err)
            }) 
        }else{
            this.id = Math.random();
             //must use arrow function to make "this" points to the new object
             products.push(this);
             //put data in json type in the file
             fs.writeFile(p, JSON.stringify(products), (err)=> {
                 console.log(err)
             })
        }
        });
        // products.push(this);
        */
    };


    //in line 49 not clear the argument value produtcs,,how will
    static findById(id){
        // getProductModel((products) => {
        //     const product = products.find(p => p.id == id) //sync function
        //     //console.log(product);
        //     cb(product)  //async function that's why it's worked
        // })
        return db.execute('SELECT * from Products WHERE Products.idProduct = ?',[id])
    }

    static deleteById(id){
        getProductModel((products) => {
            const product = products.find(p => p.id == id);
            const updatedProducts =  products.filter(p => p.id != id);
            //console.log(updatedProducts);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err)=> {
                if(!err){
                  Cart.deleteProduct(id, product.price);
                }else{
                  console.log(err)
                }
            });
        })
        
    };
    
    static fetchAll(){
        //getProductModel(cb)};
      return db.execute('SELECT * FROM Products');
            //    .then(([result])=>{console.log('result',result)})
            //    .catch((err)=>{console.log(err)})
    }
  
}
