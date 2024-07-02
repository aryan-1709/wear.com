const express = require("express");
const router = express.Router();
const Product = require("../schemas/productModel");

router.post("/list", async (req, res) => {
  const data = req.body;
  const newProduct = new Product({
    name: data.name,
    price: data.price,
    description: data.description,
    sizes: data.sizes,
    category: data.category,
    colors: data.colors,
    listImages: data.allResults,
  });
  try {
    await newProduct.save().then(() => {
      console.log("Product is saved");
    });
    res.json("Product is Added Successfully");
  } catch (error) {
    console.log("Cannot save data 500", error);
    res.errored("Cannot save data", error);
  }
});

module.exports = router;
