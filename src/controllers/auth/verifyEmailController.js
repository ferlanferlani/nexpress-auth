import { verifyEmailRepository } from "../../repositories/auth/verifyEmailRepository.js";

export const verifyEmailController = async (req, res) => {
  try {
    await verifyEmailRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
