import aws from "aws-sdk";
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
  credentials: new aws.SharedIniFileCredentials({ profile: "wasabi" }),
});
const ep = new aws.Endpoint("s3.wasabisys.com");
// Create an IAM client
const s3 = new aws.S3({ endpoint: ep });
export default async function handler(req, res) {
  console.log("upload query file: ", req.query.file);
  console.log("BUCKET NAME: ", process.env.AWS_BUCKET_NAME);
  let post;

  // Expires: 60,
  // Conditions: [["content-length-range", 0, 104857600]],
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    key: "lol/lol",
    Fields: {
      key: "test",
    },
  };
  try {
    post = await new Promise((r) =>
      s3.createPresignedPost(params, (err, data) => {
        if (err) {
          console.error("Presigning post data encountered an error", err);
        } else {
          console.log("The post data is", data);
        }
      })
    );
  } catch (e) {
    console.log("url error", e);
  }
  console.log("post: ", post);
  res.status(200).json(post);
}
