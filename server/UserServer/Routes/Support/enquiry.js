const express = require("express");
const router = express.Router();
const User = require("../../Schemas/UserSchema");
const ContactUsSchema = require("../../Schemas/ContactUsSchema");

router.post("/support", async (req, res) => {
  await User.findById(req.body.userId).then(async (user) => {
    if(!req.body.userId)
      return res.json({ok:false, msg:"Create an account/login to raise an issue"});
    let data = user.support;
    const newEnquiry = new ContactUsSchema({
      name: user.name,
      email: user.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    data.push(newEnquiry);
    console.log("new support ", data);
    user.support = data;
    await user.save();
    res.json({ ok: true, query:newEnquiry});
  });
});

module.exports = router;
