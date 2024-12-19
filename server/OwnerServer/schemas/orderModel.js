const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: {
    type: [
      { id: Schema.Types.ObjectId, qty: Number, color: Number, size: Number },
    ],
    require: true,
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
    type: Number,
  },
});

const Order = mongoose.Model("order", OrderSchema);

module.exports = Order;
