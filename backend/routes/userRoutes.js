import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  deleteUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protectUser, getUsers);
router.post("/login", authUser);
router
  .route("/profile/:id")
  .get(protectUser, getUserProfile)
  .delete(protectUser, deleteUser)
  .put(protectUser, updateUserProfile)

export default router;
