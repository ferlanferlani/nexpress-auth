import { save } from "../../repositories/auth/saveVerificationTokenRepositories.js";

export const saveVerificationToken = async (
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
