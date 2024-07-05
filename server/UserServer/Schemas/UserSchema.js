const mongoose = require("mongoose");
const Item = require("./cartSchema");
const Schema = mongoose.Schema;
const Buy = require("./purchaseSchema");

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    cart:{
        type:[Item.schema],
        default:[]
    },
    purchasedItems:{
        type:[Buy.schema],
        default:[]
    }
  });

const User = mongoose.model('user', userSchema);

module.exports = User;