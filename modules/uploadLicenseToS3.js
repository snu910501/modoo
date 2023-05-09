const { S3 } = require("aws-sdk");
const moment = require("moment");
const fs = require("fs");

require("dotenv").config();

module.exports = uploadImageToS3 = async (userId, images) => {
  let url = [];
  const date = moment().format('YYYY-MM-DD');
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
  });

  const promiseList = images.map((file) => {
    const fileStream = fs.createReadStream(file.path);
    const fileExt = file.originalname.split('.')[1];
    // buffer, stream

    return s3.upload({
      Bucket: 'modoorealestate',
      // 파일명
      Key: `license/${userId}.${fileExt}`,
      Body: fileStream,
    })
      .promise();
  });

  const result = await Promise.all(promiseList);
  result.map(v => {
    url.push({ location: v.Location, fileName: v.key })
  });

  return url[0].location;
};
