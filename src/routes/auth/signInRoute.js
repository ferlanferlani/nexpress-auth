import express from "express";
import { signIn } from "../../controllers/auth/signInController.js";

const router = express.Router();
router.post("/auth/signin/", signIn);
export default router;
