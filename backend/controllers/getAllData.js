import mongoose from "mongoose";
import Product from "../Schema/ProductSchema.js"



export const getAlldata= async(req,res)=>{
    try {
        const data=await Product.find({});
        res.json(data);
    } catch (error) {
       console.log(error);
    }
}
export const GetASingleUser= async(req,res)=>{
    const {id}= req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
        try {
            const data=await Product.find({_id:id});
            if(data){
                res.json(data);
            }
        } catch (error) {
           console.log(error);
        }
    }
}