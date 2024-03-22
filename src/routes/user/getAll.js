import express from "express";
import { getAll } from "../../controllers/user/getAll.js";
import { extractToken, verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();
router.get("/user/", extractToken, verifyToken, getAll);
export default router;
