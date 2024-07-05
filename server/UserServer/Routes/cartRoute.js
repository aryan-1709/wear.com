const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

router.post("/addItem", async (req, res) => {
    console.log("Hit", req.body);
    const resp = await cartController(req.body.userId, req.body.ObjectId, req.body.qty);
    return res.json(resp);
});

module.exports = router;