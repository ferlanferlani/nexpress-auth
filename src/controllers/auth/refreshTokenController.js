import { refreshTokenRepository } from "../../repositories/auth/refreshTokenRepository.js";

export const refreshTokenController = async (req, res) => {
  try {
    await refreshTokenRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
