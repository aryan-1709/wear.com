const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema =new Schema({
    product_id:{
        type: Schema.Types.ObjectId,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
})

const Item = mongoose.model("item", cartSchema);

module.exports = Item;