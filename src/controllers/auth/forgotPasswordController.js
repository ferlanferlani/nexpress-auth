import { forgotPasswordRepository } from "../../repositories/auth/forgotPasswordRepositories.js";

export const forgotPasswordController = async (req, res) => {
  try {
    await forgotPasswordRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
