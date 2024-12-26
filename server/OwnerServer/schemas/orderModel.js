const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: {
    type: [
      { id: Schema.Types.ObjectId, qty: Number, color: Number, size: Number, imgUrl: String },
    ],
    require: true,
  },
  cId:{
    type: Schema.Types.ObjectId  //customer ID
  },
  name: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
  add: {
    type: String,
  },
  tId: {
    type: String,
    require: true,
  },
  mode: {
    type: String,
  },
  tamt: {
    type: Number,//transaction amount
  },
  city:{
    type:String
  },
  state:{
    type:String
  },
  pincode:{
    type:Number
  }
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
