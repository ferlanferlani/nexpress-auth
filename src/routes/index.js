import express from "express";

// import auth route
import signUp from "./auth/signUp.js";

const router = express.Router();

// auth router
router.use(signUp);

router.get("/", (req, res) => {
  res.send("Nexpress API");
});
export default router;
