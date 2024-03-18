import { save } from "../../repositories/verificationToken.js";

export const getVerificationTokenData = async (userId, name, email, token) => {
  try {
    // save verification token
    await save(userId, name, email, token);
  } catch (error) {
    console.log(error);
  }
};
