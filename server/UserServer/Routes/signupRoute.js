const express = require("express");
const router = express.Router();
const signupCotroller = require("../Controllers/signupController");

router.post("/signup", async (req, res) => {
    const info = req.body;
    const resp = await signupCotroller({name:(info.fname +" "+ info.lname), email:info.email, password:info.password});
    console.log(resp);
    res.json(resp);
});

module.exports = router;