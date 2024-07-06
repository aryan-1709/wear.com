const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("../../OwnerServer/schemas/productModel");

const cartSchema =new Schema({
    products:{
        type: Product.schema,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
})

const Item = mongoose.model("item", cartSchema);

module.exports = Item;