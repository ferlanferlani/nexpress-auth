import express from "express";

import { forgotPasswordController } from "../../controllers/auth/forgotPasswordController.js";
const router = express.Router();
router.post("/auth/forgot-password/", forgotPasswordController);
export default router;
