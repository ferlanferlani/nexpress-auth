import express from "express";

// import auth route
import signUpRoute from "./auth/signUp.js";
import verifyEmailRoute from "./auth/verifyEmail.js";

const router = express.Router();

// auth router
router.use(signUpRoute);
router.use(verifyEmailRoute);

router.get("/", (req, res) => {
  res.send("Nexpress API");
});
export default router;
