import { saveVerificationTokenRepository } from "../../repositories/auth/saveVerificationTokenRepository.js";

export const saveVerificationTokenController = async (
  userId,
  name,
  email,
  token,
  verificationTokenType,
  res
) => {
  try {
    // save verification token
    await saveVerificationTokenRepository(
      userId,
      name,
      email,
      token,
      verificationTokenType,
      res
    );
  } catch (error) {
    console.log(error);
  }
};
