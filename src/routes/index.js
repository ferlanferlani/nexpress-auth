import express from "express";

// import auth route
import signUp from "./auth/signUp.js";
import verifyEmail from "./auth/verifyEmail.js";

const router = express.Router();

// auth router
router.use(signUp);
router.use(verifyEmail);

router.get("/", (req, res) => {
  res.send("Nexpress API");
});
export default router;
