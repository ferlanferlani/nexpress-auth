import { update } from "../../repositories/verificationToken.js";

export const updateVerificationToken = async (verificationTokenId) => {
  try {
    await update(verificationTokenId);
  } catch (error) {
    console.log(error);
  }
};
