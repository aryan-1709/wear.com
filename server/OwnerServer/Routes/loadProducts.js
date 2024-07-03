const express = require("express");
const router = express.Router();
const Product = require("../schemas/productModel");

router.get("/get", async (req, res) => {
  const allData = await Product.find();
  res.json(allData);
});

module.exports = router;
