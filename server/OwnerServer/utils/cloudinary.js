const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
const fs = require("fs")

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const upload_file = async(localFilePath) => {
    try {
        if(!localFilePath)
            return null;
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        console.log("file uploaded sucessfully",res.url);
        fs.unlinkSync(localFilePath);
        return res.url;
    } catch (error) {
        fs.unlinkSync(localFilePath) //removes locally saved temp file as the upload operation failed
    }
}
module.exports =  upload_file;