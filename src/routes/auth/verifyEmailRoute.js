import express from "express";
import { verifyEmailController } from "../../controllers/auth/verifyEmailController.js";

const router = express.Router();
router.get("/auth/verify-email/:name/", verifyEmailController);
export default router;
