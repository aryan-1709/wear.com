const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_file = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return res.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};
module.exports = upload_file;
