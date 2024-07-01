const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String], // Array of strings to represent different sizes
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  colors: {
    type: [String], // Array of strings to represent different colors
    required: true,
  },
  listImages: {
    type: [[String]], // Array of arrays of strings to represent groups of image URLs
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
