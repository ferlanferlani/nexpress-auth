import crypto from "crypto";
export const createTokenHelper = () => {
  return crypto.randomBytes(32).toString("hex");
};
