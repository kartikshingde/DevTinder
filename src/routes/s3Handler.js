const { GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();

const s3Client=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})

const getUploadUrl = async (filename, contentType) => {
    try{
        // console.log(filename.filename)
        const key=`devTinder/profilePhotos/${filename.filename}-${Date.now()}`;
        const command=new PutObjectCommand({
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:key,
            ContentType:contentType
        })

        const url=await getSignedUrl(s3Client,command,{expiresIn:3600});
        return {url,key};

    }catch(err){
        console.error("Error Generating Upload Url: ",err);
        throw err;
    }

}

const getDownloadUrl = async (key) => {

    try{


        const url=process.env.CLOUDFRONT_DOMAIN +key;
        // console.log(url);

        return url;


    } catch(err) {
        console.error("Error generating download url: ", err);
        throw err;
    }
};

module.exports = { getUploadUrl, getDownloadUrl };