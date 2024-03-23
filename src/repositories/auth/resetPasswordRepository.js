import { resetPassworController } from "../../controllers/auth/resetPasswordController.js";

export const resetPasswordRepository = async (req, res) => {
  try {
    await resetPassworController();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
