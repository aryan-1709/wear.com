const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TshirtOrderSchema = new Schema({
  logoImage: {
    type: String,
    required: false,  
  },

  fullSizeImage:{
    type:String,
    required: false
  },

  imageType: {
    type: [String],
    enum: ['full-size', 'logo'], 
    required: true, 
  },

  printSide: {
    type: [String], 
    enum: ['front', 'back', 'shoulder', 'chest'],  
    required: true,
  },

}, { timestamps: true });

const TshirtOrderModel = mongoose.model("TshirtOrder", TshirtOrderSchema);

module.exports = { TshirtOrderModel };