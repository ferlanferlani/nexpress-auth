import { forgotPasswordRepository } from "../../repositories/auth/forgotPasswordRepositories.js";

export const forgotPasswordController = async (
  userId,
  name,
  email,
  token,
  verificationTokenType,
  res
) => {
  try {
    await forgotPasswordRepository(
      userId,
      name,
      email,
      token,
      verificationTokenType,
      res
    );
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
