import express from "express";

// import auth route
import signUpRoute from "./auth/signUp.js";
import verifyEmailRoute from "./auth/verifyEmail.js";
import resendVerificationEmailRoute from "./auth/resendVerificationEmail.js";
import signInRoute from "../routes/auth/signIn.js";

// import user route
import userRouter from "../routes/user/getAll.js";
import userLogout from '../routes/auth/logout.js'

const router = express.Router();

// auth router
router.use(signUpRoute);
router.use(signInRoute);
router.use(verifyEmailRoute);
router.use(resendVerificationEmailRoute);
router.use(userLogout)

// user route
router.use(userRouter);

router.get("/", (req, res) => {
  res.send("Nexpress API");
});
export default router;
