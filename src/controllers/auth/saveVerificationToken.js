import { save } from "../../repositories/verificationToken.js";

export const getVerificationTokenData = async (
  userId,
  name,
  email,
  token,
  res
) => {
  try {
    // save verification token
    await save(userId, name, email, token, res);
  } catch (error) {
    console.log(error);
  }
};
