const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadImage = (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${uuidv4()}-${filePath.split('/').pop()}`,
    Body: fileContent,
    ACL: 'public-read',
  };

  return s3.upload(params).promise();
};

module.exports = uploadImage;
