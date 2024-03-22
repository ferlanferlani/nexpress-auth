import express from "express";
import { resendEmailVerificationController } from "../../controllers/auth/resendEmailVerificationController.js";

const router = express.Router();
router.post(
  "/auth/resend-email-verification/",
  resendEmailVerificationController
);
export default router;
