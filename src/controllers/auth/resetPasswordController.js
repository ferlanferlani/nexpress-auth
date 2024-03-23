import { resetPasswordRepository } from "../../repositories/auth/resetPasswordRepository.js";

export const resetPassworController = async (req, res) => {
  try {
    await resetPasswordRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
