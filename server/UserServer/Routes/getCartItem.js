const express = require("express");
const router = express.Router();
const getCartItems = require("../Controllers/getCartItems");

router.get("/getCart", async (req, res) => {
    try {
        const resp = await getCartItems(req.body.userId);
        return res.json(resp);
    } catch (error) {
        return res.json(error);
    }
});

module.exports = router;