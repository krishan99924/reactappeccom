import express from "express"
import {
 addItemToCart,
 getCartItem
} from "../controllers/cartControllers.js";
import { isUserLoggedIn } from "../controllers/userController.js";

const router = express.Router();

router.route("/additem").post(isUserLoggedIn, addItemToCart);
router.route("/getitem").post(isUserLoggedIn, getCartItem);

export default router;