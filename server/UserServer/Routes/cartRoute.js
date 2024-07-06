const express = require("express");
const router = express.Router();
const {cartController} = require("../Controllers/cartController");

router.post("/addItem", async (req, res) => {
    const resp = await cartController(req.body.userId, req.body.product, req.body.qty);
    return res.json(resp);
});

module.exports = router;