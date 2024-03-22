import { saveVerificationTokenRepository } from "../../repositories/auth/saveVerificationTokenRepository.js";

export const saveVerificationTokenController = async (
  userId,
  name,
  email,
  token,
  res
) => {
  try {
    // save verification token
    await saveVerificationTokenRepository(userId, name, email, token, res);
  } catch (error) {
    console.log(error);
  }
};
