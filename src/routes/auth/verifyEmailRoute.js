import express from "express";
import { verifyEmail } from "../../controllers/auth/verifyEmailController.js";

const router = express.Router();
router.get("/auth/verify-email/", verifyEmail);
export default router;
