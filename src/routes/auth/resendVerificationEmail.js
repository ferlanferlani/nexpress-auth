import express from "express";
import { resendEmailVerification } from "../../controllers/auth/resendEmailVerification.js";

const router = express.Router();
router.post("/auth/resend-email-verification/", resendEmailVerification);
export default router;
