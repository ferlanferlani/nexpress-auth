import express from "express";
import { logoutContorller } from "../../controllers/auth/logoutController.js";

const router = express.Router();
router.delete("/auth/logout", logoutContorller);
export default router;
