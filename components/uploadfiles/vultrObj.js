// import crypto from 'crypto'
//
// const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3AccessKeyVultr,
  secretAccessKey: process.env.S3SecretKeyVultr,
  signatureVersion: "v4",
  region: "us-east-1", // This is a required option, but it can be any region
});

export async function generateUploadURL() {
  // const fileName = generateFileName()
  let filename;
  const params = {
    Bucket: "roomFollow",
    Key: fileName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
