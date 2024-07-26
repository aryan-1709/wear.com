const mongoose = require("mongoose");

const Constact = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    resolved:{
        type:Boolean,
        default:false
    }
},{timestamps: true});

const NewEnquiry = mongoose.model("enquiry", Constact);

module.exports = NewEnquiry;