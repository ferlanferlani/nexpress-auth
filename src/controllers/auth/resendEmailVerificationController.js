import { resendEmailVerificationRepository } from "../../repositories/auth/resendEmailVerificationRepository.js";
export const resendEmailVerificationController = async (req, res) => {
  try {
    await resendEmailVerificationRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
