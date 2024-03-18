import express from "express";
import { updateVerificationToken } from "../../controllers/auth/updateVerificationToken.js";

const router = express.Router();
router.put("/auth/update-verification-token/", updateVerificationToken);
export default router;
