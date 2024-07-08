const express = require("express");
const router = express.Router();
const {
  cartController,
  clearCart,
  deleteItem,
  getCartItems,
} = require("../../Controllers/CartController/cartController");

router.post("/getProductById", async (req, res) => {
  try {
    const resp = await getCartItems(req.body.product_id);
    return res.json(resp);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/deleteItem", async (req, res) => {
  const info = req.body;
  const resp = await deleteItem(info);
  res.json(resp);
});

router.post("/clearCart", async (req, res) => {
  const resp = await clearCart(req.body);
  res.json(resp);
});

router.post("/addItem", async (req, res) => {
  const resp = await cartController(
    req.body.userId,
    req.body.product,
    req.body.qty
  );
  return res.json(resp);
});

module.exports = router;
