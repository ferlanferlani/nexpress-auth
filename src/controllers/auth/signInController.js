import { signInRepository } from "../../repositories/auth/signInRepository.js";

export const signInController = async (req, res) => {
  try {
    await signInRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
