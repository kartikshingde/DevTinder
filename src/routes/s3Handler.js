import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { S3Client } from "@aws-sdk/client-s3";

import dotenv from "dotenv"
dotenv.config()
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const getUploadUrl=async(filename,contentType)=>{
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

export const getDownloadUrl=async(key)=>{

    try{

        const command=new GetObjectCommand({
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:key
        })

        const url=await getSignedUrl(s3Client,command,{expiresIn:3600});
        console.log(url);

        return url;


    }catch(err){
        console.error("Error generating download url: ",err);
        throw err;
    }
}