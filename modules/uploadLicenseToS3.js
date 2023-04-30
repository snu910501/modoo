const { S3 } = require("aws-sdk");
const fs = require("fs");

require("dotenv").config();

module.exports = uploadImageToS3 = async (images) => {
  let url = [];
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
  });

  const promiseList = images.map((file) => {
    const fileStream = fs.createReadStream(file.path);
    const decodedFilename = iconv.decode(file.originalname, 'utf-8');
    // buffer, stream

    return s3.upload({
      Bucket: 'modoorealestate',
      // 파일명
      Key: `license/${decodedFilename}`,
      Body: fileStream,
    })
      .promise();
  });

  const result = await Promise.all(promiseList);
  result.map(v => {
    url.push({ location: v.Location, fileName: v.key })
  });
  console.log('url', url);
  return url;
};
