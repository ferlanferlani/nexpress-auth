import express from "express";
import { getAllUserController } from "../../controllers/user/userController.js";
import {
  extractToken,
  verifyToken,
} from "../../middleware/verifyTokenMiddleware.js";

const router = express.Router();
router.get("/user/", extractToken, verifyToken, getAllUserController);
export default router;
