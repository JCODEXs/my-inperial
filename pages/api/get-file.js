import aws from 'aws-sdk';
export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  });
  const s3 = new aws.S3();

  const post = await new Promise((r) =>
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.query.file,
      },
      (e, url) => {
        r(url);
      }
    )
  );
  //  console.log(post);
  res.status(200).json(post);
}
