import express from "express";

// contorllers
import { signUpController } from "../../controllers/auth/signUpController.js";

const router = express.Router();
router.post("/auth/signup/", signUpController);
export default router;
