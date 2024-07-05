const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseItems = new Schema({
    item:{
        type: Schema.Types.ObjectId,
        require: true,
    },
    deliveryStatus:{
        type:String,
        default:"On the way"
    }
})

const Buy = mongoose.model("purchase", purchaseItems);

module.exports = Buy;