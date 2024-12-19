const express = require("express");
const router = express.Router();
const {validate} = require("../../Controllers/PaymentHandler/validate")

router.post("/validate", async (req, res) => {
   const resp = await validate(req.body);
   if(resp.msg != "success")
       return res.status(400).json({ msg: "Transaction is not legit!" });   
   res.json(resp); 
});

module.exports = router;