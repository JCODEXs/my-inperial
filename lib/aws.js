import aws from "aws-sdk";
import mime from "mime-types";
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
export const deleteFiles = async (id) => {
  const result = await s3
    .listObjects({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: encodeURIComponent(id) + "/",
    })
    .promise();
  const files = result.Contents;
  await Promise.all(
    files.map((file) =>
      s3
        .deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: file.Key })
        .promise()
    )
  );
};
// export const deleteFolder = async (id) => {
//   const fs = require("fs"); // Or `import fs from "fs";` with ESM
//   const markersFolder = `/${process.env.MARKERS_FOLDER}`;
//   if (fs.existsSync(`${markersFolder}${id}`)) {
//     fs.rmSync(`${markersFolder}${id}`, { recursive: true });
//     console.log("DELETED");
//   }
// };
export const getFiles = async (id, download = false) => {
  const result = await s3
    .listObjects({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: encodeURIComponent(id) + "/",
    })
    .promise();
  // const defaultFiles = result.Contents.filter((item) => mime.lookup(item.Key));
  const markerFiles = result.Contents.filter((item) => !mime.lookup(item.Key));
  // console.log('defaultFiles: ', defaultFiles);
  // console.log('markerFiles: ', markerFiles);
  if (download) {
    //  console.log('__dirname: ', __dirname);
    //  console.log(process.cwd());
    const fs = require("fs"); // Or `import fs from "fs";` with ESM
    // const markersFolder = `${process.cwd()}/.next/${process.env.MARKERS_FOLDER}`;
    //    const markersFolder = `${process.cwd()}/${process.env.MARKERS_FOLDER}`;

    const markersFolder = `/${process.env.MARKERS_FOLDER}`;
    if (!fs.existsSync(markersFolder)) {
      // Do something
      fs.mkdirSync(markersFolder);
    }
    if (!fs.existsSync(`${markersFolder}${id}`)) {
      // Do something
      fs.mkdirSync(`${markersFolder}${id}`);
      await Promise.all(
        markerFiles.map((item) => {
          const pipe = require("fs").createWriteStream(
            `${markersFolder}${item.Key}`
          );
          const file = s3
            .getObject({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: item.Key,
            })
            .createReadStream()
            .pipe(pipe);
        })
      );
    }
  }
  // const files = {};
  // const filesResult = await Promise.all(
  //     [Promise.all(
  //         defaultFiles.map(async (item) => {
  //             const mimeType = mime.lookup(item.Key);
  //             const uri = await s3.getSignedUrl('getObject', {
  //                 Bucket: process.env.AWS_BUCKET_NAME,
  //                 Key: item.Key
  //             });
  //             return {
  //                 type: mimeType ? mimeType : `nft-marker/${item.Key.split('.').pop()}`,
  //                 uri
  //             };
  //         })),
  //     Promise.all(
  //         markerFiles.map(async (item) => {
  //             // const pipe = require('fs').createWriteStream('images/test/testfile.png');
  //             // const file = await s3.getObject({
  //             //     Bucket: process.env.AWS_BUCKET_NAME,
  //             //     Key: item.Key
  //             // }).createReadStream().pipe(pipe);
  //             // console.log(file);
  //             // return file.Body;
  //             // const file = await s3.getObject({
  //             //     Bucket: process.env.AWS_BUCKET_NAME,
  //             //     Key: item.Key
  //             // }).promise();
  //             // console.log(file);
  //             // return file.Body;
  //             const mimeType = mime.lookup(item.Key);
  //             const uri = await s3.getSignedUrl('getObject', {
  //                 Bucket: process.env.AWS_BUCKET_NAME,
  //                 Key: item.Key
  //             });
  //             return {
  //                 type: mimeType ? mimeType : `nft-marker/${item.Key.split('.').pop()}`,
  //                 uri
  //             };
  //         })
  //     )
  //     ]);
  // console.log(filesResult);

  const files = await Promise.all(
    result.Contents.map(async (item) => {
      const mimeType = mime.lookup(item.Key);
      const uri = await new Promise((r) =>
        s3.getSignedUrl(
          "getObject",
          {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: item.Key,
          },
          (e, url) => {
            r(url);
          }
        )
      );
      return {
        type: mimeType ? mimeType : `nft-marker/${item.Key.split(".").pop()}`,
        uri,
      };
    })
  );

  // const folder = await s3.getSignedUrl('getObject', {
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: `${id}/Skater`,
  // });
  // console.log('folder', folder);
  return files;
};
