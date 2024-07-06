const express = require("express");
const router = express.Router();
const loginController = require("../Controllers/loginController");

router.post("/login", async (req, res)=>{
    const resp = await loginController({email:req.body.email, password:req.body.password})
    res.json(resp);
})

module.exports = router;