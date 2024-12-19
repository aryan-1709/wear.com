const express = require("express");
const router = express.Router();
const{checkout} = require('../../Controllers/PaymentHandler/checkout')


router.post("/checkout", async (req, res) => {
   const resp = await checkout(req.body);
   if(!resp.order)  return res.status(500).send("Error");
   res.json(resp.order);
});

module.exports = router;