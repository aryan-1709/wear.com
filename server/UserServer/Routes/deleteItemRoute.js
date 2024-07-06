const express = require("express");
const router = express.Router();
const {deleteItem} = require("../Controllers/cartController")

router.post("/deleteItem",async (req, res) => {
    const info = req.body;
    const resp = await deleteItem(info);
});

module.exports = router;