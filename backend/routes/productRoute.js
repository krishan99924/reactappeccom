import express from "express";
import { GetASingleUser, getAlldata } from "../controllers/getAllData.js";
import {
  GetProductDelete,
  GetProductUpdated,
  getFileUpload,
  getNewProductCreated,
} from "../controllers/productController.js";
import { upload } from "../middlewares/multerMiddleware.js";

let productRouter = express.Router();

productRouter.route("/products").get(getAlldata);
productRouter.route("/products/:id").get(GetASingleUser);
productRouter
  .route("/product/createProduct")
  .post(upload.single("image"), getFileUpload, getNewProductCreated);
productRouter
  .route("/product/updateProduct/:id")
  .post(upload.single("image"), getFileUpload, GetProductUpdated);
productRouter.route("/product/deleteProduct/:id").delete(GetProductDelete);

export default productRouter;
