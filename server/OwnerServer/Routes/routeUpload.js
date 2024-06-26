const express = require('express');
const router = express.Router();
const upload_file = require("../utils/cloudinary");
const upload = require("../middlesware/middleware_multer")

router.post('/upload', upload.single('image'), async function (req, res) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }
  console.log(req.file.path);
  const resp = await upload_file(req.file.path).then(console.log("File uploaded Sucsess"));
  return res.json(resp);
});

module.exports = router;
