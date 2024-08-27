import express from "express";
import {
  CreateUser,
  LoggedUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/createUser").post(CreateUser);
router.route("/login").post(LoggedUser);
router.route("/alluser").get(getAllUsers);
router.route("/alluser/:id").delete(deleteUser);

export default router;
