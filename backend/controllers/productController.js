import mongoose from "mongoose";
import Product from "../Schema/ProductSchema.js";
import uploadImageInCloudnary from "../utils/cloudnary.js";

export const getFileUpload = async (req, res, next) => {
  try {
    const { title, price, description, category } = req.body;
    let imageUrl = null;
    if (req.file) {
      const result = await uploadImageInCloudnary(req.file.path);
      imageUrl = result.secure_url;
    }
    req.secure_url = imageUrl;
    next();
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getNewProductCreated = async (req, res) => {
  console.log("running...................");
  const { title, price, description, category, image, qnty } = req.body;
  console.log("req.image", image);
  try {
    const product = new Product({
      title: title,
      price: price,
      description: description,
      category: category,
      qnty: qnty,
      image: req.secure_url,
    });
    try {
      console.log("is this code running.....");
      await product.save();
    } catch (error) {
      console.log("erroeredfszzzzzzzz", error);
    }
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const GetProductUpdated = async (req, res) => {
  const { title, price, description, category, image, qnty } = req.body;
  const prId = req.params.id;
  const update = {
    title: title,
    price: price,
    description: description,
    category: category,
    qnty: qnty,
    image: req?.secure_url ? req.secure_url : image,
  };
  try {
    const iseProductPresent = await Product.findByIdAndUpdate(prId, update, {
      new: true,
    });
    return res.json(iseProductPresent);
  } catch (error) {
    console.log("erroeredfszzzzzzzz", error);
  }
  res.status(201).json({ message: "Product updated successfully" });
};
export const GetProductDelete = async (req, res) => {
  const prId = req.params.id;
  console.log("prId", prId);
  try {
    const iseProductPresent = await Product.deleteOne({ _id: prId });
    return res.json(iseProductPresent);
  } catch (error) {
    console.log("erroeredfszzzzzzzz", error);
  }
  res.status(201).json({ message: "Product deleted successfully" });
};
