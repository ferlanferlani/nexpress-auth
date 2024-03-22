import express from "express";
import { logout } from "../../controllers/auth/logoutController.js";

const router = express.Router();
router.delete("/auth/logout", logout);
export default router;
