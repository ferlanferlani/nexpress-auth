import express from "express";

// contorllers
import { SignUp } from "../../controllers/auth/signUpController.js";

const router = express.Router();
router.post("/auth/signup/", SignUp);
export default router;
