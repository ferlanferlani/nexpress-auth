import express from "express";
import { resetPassworController } from "../../controllers/auth/resetPasswordController.js";

const router = express.Router();
router.get("/auth/reset-password/:name/", resetPassworController);
export default router;
