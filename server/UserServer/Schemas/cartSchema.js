const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  size:{
    type: Number,
    require: true,
    default: 0
  },
  color:{
    type: Number,
    require: true,
    default: 0
  }
});

const Item = mongoose.model("item", cartSchema);

module.exports = Item;
