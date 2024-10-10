const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number,
    // size:String,
    availableSizes: {
        type: [String], 
        // required: true
    }
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel