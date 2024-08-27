import {mongoose} from "mongoose";


const connection = async () => {
    try {
      await mongoose.connect(process.env.MONGODBURL);
      console.log("connetion sussessful...");
    } catch (error) {
      console.log(error);
    }
  };
  
export default connection;
