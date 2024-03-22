import express from "express";
import { verifyEmailController } from "../../controllers/auth/verifyEmailController.js";

const router = express.Router();
router.get("/auth/verify-email/", verifyEmailController);
export default router;
