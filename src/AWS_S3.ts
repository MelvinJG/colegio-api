import S3 from 'aws-sdk/clients/s3';
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const bucketName = 'bucketcreadovsc'/*process.env.AWS_BUCKET_NAME;*/
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region, 
    accessKeyId,
    secretAccessKey
});

//Function to uploads a file to Amazon S3
export const uploadFile = (file: any, originalName: string) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams: any = {
        ACL: "public-read",
        Bucket: `${bucketName}/Fondos`,///foto-alumnos
        Body: fileStream,
        Key: `${file.filename}${originalName}`
    }
    return s3.upload(uploadParams).promise();
}
//exports.uploadFile = uploadFile;

//Function to download a file to Amazon S3
export const getFileStream = (fileKey: string) => {
    const downloadParams: any = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream();
}
//exports.getFileStream = getFileStream;