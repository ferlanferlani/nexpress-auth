import { logoutRepository } from "../../repositories/auth/logoutRepository.js";

export const logoutContorller = async (req, res) => {
  try {
    await logoutRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
