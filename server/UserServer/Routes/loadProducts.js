const express = require("express");
const router = express.Router();
//Schema for products to find
const Product = require("../../OwnerServer/schemas/productModel");

router.get("/get", async (req, res) => {
  const allData = await Product.find();
  res.json(allData);
});

module.exports = router;
