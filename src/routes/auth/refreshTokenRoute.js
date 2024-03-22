import expres from "express";

import { refreshTokenController } from "../../controllers/auth/refreshTokenController.js";

const router = expres.Router();
router.get("/auth/refresh-token/", refreshTokenController);
export default router;
