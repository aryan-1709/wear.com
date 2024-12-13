const express = require("express");
const router = express.Router();
//Schema for products to find
const Product = require("../../../OwnerServer/schemas/productModel");

router.get("/get/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ data: product });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
  