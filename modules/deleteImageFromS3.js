const { S3 } = require("aws-sdk");

require("dotenv").config();

module.exports = deleImageFromS3 = async (estateId) => {
  const bucketName = "modoorealestate";
  const folderKey = `property/${estateId}`;
  try {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "ap-northeast-2",
    });

    const objects = await s3
      .listObjectsV2({ Bucket: bucketName, Prefix: folderKey })
      .promise();

    // 폴더 내의 객체 삭제
    const deletePromises = objects.Contents.map((obj) => {
      return s3.deleteObject({ Bucket: bucketName, Key: obj.Key }).promise();
    });

    // 모든 객체 삭제 완료 후 폴더 삭제
    await Promise.all(deletePromises);
    console.log("폴더가 성공적으로 삭제되었습니다.");
  } catch (err) {
    throw err;
  }
};
