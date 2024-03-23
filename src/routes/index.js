import express from "express";

// import auth route
import signUpRoute from "./auth/signUpRoute.js";
import verifyEmailRoute from "./auth/verifyEmailRoute.js";
import resendVerificationEmailRoute from "./auth/resendVerificationEmailRoute.js";
import signInRoute from "./auth/signInRoute.js";
import refreshTokenRoute from "./auth/refreshTokenRoute.js";
import forgotPasswordRoute from "./auth/forgotPasswordRoute.js";
import resetPassworRoute from "./auth/resetPasswordRoute.js";

// import user route
import userRouter from "./user/userRoute.js";
import userLogout from "./auth/logoutRoute.js";

const router = express.Router();

// auth router
router.use(signUpRoute);
router.use(signInRoute);
router.use(forgotPasswordRoute);
router.use(resetPassworRoute);
router.use(verifyEmailRoute);
router.use(refreshTokenRoute);
router.use(resendVerificationEmailRoute);
router.use(userLogout);

// user route
router.use(userRouter);

router.get("/", (req, res) => {
  res.sendFile("documentation/index.html", { root: "./" });
});
export default router;
