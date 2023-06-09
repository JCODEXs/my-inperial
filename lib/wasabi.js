// A good reference for V3 of S3 code examples is https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascriptv3/example_code/s3/src
// and https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascriptv3/example_code/s3/src
// FS for file uploading
// const fs = require("fs");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner"); // npm install @aws-sdk/s3-request-presigner first, https://www.npmjs.com/package/@aws-sdk/s3-request-presigner
const REGION = process.env.AWS_REGION; //https://wasabi-support.zendesk.com/hc/en-us/articles/360015106031-What-are-the-service-URLs-for-Wasabi-s-different-regions-
//https://github.com/annabelle/wasabi-aws-sdk-js-v3-demo/blob/main/wasabi_S3_JDK_V3_examples.js
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
// const { sign } = require("crypto");
const s3Client = new S3Client({
  region: REGION,
  endpoint: `https://s3.${REGION}.wasabisys.com`,
  signatureVersion: "v4",
  credentialDefaultProvider: () => ({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }),
});
// Set the bucket parameters.
const bucketParams = { Bucket: "imptech" };
// const file = "upload_me.txt"; // Path to and name of object. For example '../myFiles/index.js'.
//const file = "exampleUploadPDF.pdf";
// const fileStream= fs.createReadStream(file);
// Set the parameters for streaming object (object uploaded from file system)
// let uploadStreamingObjectParams = {
//   // bucket name
//   Bucket: bucketParams.Bucket, //Bucket: "currentj-ihasabucket",
//   // Add the required 'Key' parameter using the 'path' module.
//   Key: path.basename(file),
//   // Add the required 'Body' parameter, this is actual file content
//   Body: fileStream,
// };
//set the parameters for uploading internal application content (not uploaded)
// let internalObjectContent =
//   "<strong> I'm html and I'm uploaded, could have done a .txt <u>instead</u> here too for example </strong>";
let internalObjectName = "setcontentInternalAppContentExample.html";
//let internalObjectName = "upload_me.txt"
// Create the S3 bucket.
async function makeBucket(bucketParams) {
  try {
    const data = await s3Client.send(new CreateBucketCommand(bucketParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
// returns an array of bucket objects with name and creation Date
async function listBuckets() {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
//upload an object from a file system or internally from app, depending on parameters
async function putObject(uploadParams) {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
async function listObjectsCommand(bucketParams) {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
async function getObjectCommand(bucketParams) {
  try {
    // Create a helper function to convert a ReadableStream to a string.
    // TODO: Production apps may want a CDN as a good way to avoid reading large amounts from memeory
    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      });
    // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const bodyContents = await streamToString(data.Body);
    console.log(bodyContents);
    return bodyContents;
  } catch (err) {
    console.log("Error", err);
  }
}
async function deleteObjectCommand(bucketParams) {
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
async function getSignedURL(key) {
  const params = {
    Bucket: bucketParams.Bucket, //Bucket: "currentj-ihasabucket",
    Key: key,
    ContentType: "image/jpeg",
  };
  try {
    // Create the command.
    const command = new GetObjectCommand(params);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    // console.log(
    //   `\nGetting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`
    // );
    //
    return signedUrl;
    // console.log(signedUrl);
    /*
    // we aren't actually trying to get the content, just want the url
    const response = await fetch(signedUrl);
      nsole.log(
      `\nResponse returned by signed URL: ${await response.text()}\n`
    );
    */
  } catch (err) {
    console.log("Error creating presigned URL", err);
  }
}
async function getPreSignedURL(key) {
  try {
    const params = {
      Bucket: bucketParams.Bucket, //Bucket: "currentj-ihasabucket",
      Key: key,
      ContentType: "image/jpeg",
    };
    return await getSignedUrl(s3Client, new PutObjectCommand(params), {
      expiresIn: 3600, // The URL will expire in 1 hour
      // Set the HTTP method to PUT to allow upload
      method: "PUT",
    });
  } catch (err) {
    console.log("Error creating presigned URL", err);
  }
}
async function uploadFile(key, file) {
  console.log("THE key", key);
  console.log("THE file", file);
  // const internalObjectContent = console.log("bucket", bucketParams.Bucket);
  let uploadInternalObjectParams = {
    // bucket name
    Bucket: bucketParams.Bucket, //Bucket: "currentj-ihasabucket",
    // Add the required 'Key' parameter using the 'path' module.
    Key: key,
    // Add the required 'Body' parameter, this is actual file content
    Body: file,
    ACL: "public-read",
    ContentType: "image/jpeg",
    // ContentType: "text/html", //'text/plain' for .txt
  };
  let getObjectParams = {
    // bucket name
    Bucket: bucketParams.Bucket, //Bucket: "currentj-ihasabucket",
    // Add the required 'Key' parameter using the 'path' module.
    Key: key,
  };
  const result = await putObject(uploadInternalObjectParams);
  console.log("test img:", result);
  return await getSignedURL(getObjectParams);
}
//uncomment the code below depending on what you want to see an example of
//makeBucket(bucketParams);
// listBuckets();
//putObject(uploadStreamingObjectParams);
//putObject(uploadInternalObjectParams); //change to inline
//listObjectsCommand(bucketParams);
//getObjectCommand(getObjectParams);
//deleteObjectCommand(getObjectParams);
//getSignedURL(getObjectParams);
//if want to do an upload and directly after get the signed params then need to make sure signing is done after object is put
//putObject(uploadInternalObjectParams).then(() => getSignedURL(getObjectParams));
//
//
module.exports = {
  listBuckets,
  uploadFile,
  getPreSignedURL,
  getSignedURL,
};
