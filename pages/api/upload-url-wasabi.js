// import aws from "aws-sdk";
// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION,
//   signatureVersion: "v4",
//   credentials: new aws.SharedIniFileCredentials({ profile: "wasabi" }),
// });
// const ep = new aws.Endpoint("s3.wasabisys.com");
// // Create an IAM client
// const s3 = new aws.S3({ endpoint: ep });
//
import {
  listBuckets,
  uploadFile,
  getPreSignedURL,
  getSignedURL,
} from "lib/wasabi";
// import formidable from "formidable";
export default async function handler(req, res) {
  console.log("test: ");

  console.log("upload query file: ", req.query.file);
  try {
    const result = await getPreSignedURL(req.query.file);
    const result2 = await getSignedURL(req.query.file);
    console.log("Presigned URL:", result);
    res.status(200).json({ post: result, get: result2 });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send(error);
  }

  // console.log("done: ", done);
  // const formdata = new FormData(req.body);

  // console.log("formData: ", formData);
  // console.log("BUCKET NAME: ", process.env.AWS_BUCKET_NAME);
  // let post;
  //
  // // Expires: 60,
  // // Conditions: [["content-length-range", 0, 104857600]],
  // const params = {
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   key: "lol/lol",
  //   Fields: {
  //     key: "test",
  //   },
  // };
  // try {
  //   post = await new Promise((r) =>
  //     s3.createPresignedPost(params, (err, data) => {
  //       if (err) {
  //         console.error("Presigning post data encountered an error", err);
  //       } else {
  //         console.log("The post data is", data);
  //       }
  //     })
  //   );
  // } catch (e) {
  //   console.log("url error", e);
  // }
  // console.log("post: ", post);
  //
  // listBuckets();
  // const url = await uploadFile("testImg.jpeg", req.body.file);
}
