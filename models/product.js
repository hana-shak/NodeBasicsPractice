const pt = require('../util/path');
const fs = require('fs');
const path = require('path');
const p = path.join(pt, 'data', 'products.json');

const getProductModel = (cb) =>{
    
    fs.readFile(p, (err, fileContent)=>{
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    })
}

// const products = []; 

module.exports= class Product{
    constructor(t){
        this.title = t;
    }

    save(){
        // const p = path.join(pt, 'data', 'products.json');
        let products = [];
        fs.readFile(p, (err, fileContent)=>{
            if(!err){
                //convert the json type into array
                products = JSON.parse(fileContent); 
            }
            //must use arrow function to make "this" points to the new object
            products.push(this);
            //put data in json type in the file
            fs.writeFile(p, JSON.stringify(products), (err)=> {
                console.log(err)
            })
            
        });
        // products.push(this);
    }

    static fetchAll(cb){
        getProductModel(cb)
    }
}
