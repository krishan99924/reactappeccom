import Product from "../Schema/ProductSchema";

export const productCreate = async (req, res) => {
  const product = new Product({
    title: req.name,
    price: req.price,
    description: req.description,
    category: req.category,
    image: req.secure_url,
  });
  try {
    await product.save();
  } catch (error) {
    console.log("erroeredfszzzzzzzz", error);
  }
};
