const express = require("express");
const router = express.Router();
const {
  cartController,
  clearCart,
  deleteItem, 
  addOrUpdateImage,
  updateItemQuantity
} = require("../../Controllers/CartController/cartController");

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
    req.body.qty,
    req.body.size,
    req.body.color
  );
  return res.json(resp);
});

router.post("/addOrUpdateImage", async (req, res) => {
  const resp = await addOrUpdateImage(req.body);
  res.json(resp);
})

router.post("/updateItemQuantity", async (req, res) => {
  const resp = await updateItemQuantity(req.body);
  res.json(resp);
})

module.exports = router;
