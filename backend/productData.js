import mongoose from "mongoose";
import {productData} from "./constant/constant.js";
import connection from "./connection/connection.js";
import Product from "./Schema/ProductSchema.js"
import dotenv from "dotenv";

dotenv.config();

await connection();

async function importData() {
  try {
    // Insert data into MongoDB
    await Product.insertMany(productData);
  }
  catch(error){
    console.log(error);
  }
}
async function DeleteData() {
  try {
    // delete data into MongoDB
    await Product.deleteMany();
  }
  catch(error){
    console.log(error);
  }
}
if(process.argv[2]==="delete"){
    console.log("deleting...");
    DeleteData();
}
else{
    importData();
}
