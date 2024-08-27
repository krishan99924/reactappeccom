import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEYCLOUD,
  api_secret: process.env.APISECRET,
});

const uploadImageInCloudnary = async (FilePath) => {
  try {
    if (!FilePath) return null;
    // upload the path
    console.log("code is rnunng till here!");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const response = await cloudinary.uploader.upload(FilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    console.log("catch block is running", error);
    fs.unlinkSync(FilePath);
    return null;
  }
};
export default uploadImageInCloudnary;
