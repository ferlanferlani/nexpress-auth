import { signUpRepostiory } from "../../repositories/auth/signUpRepository.js";

export const signUpController = async (req, res) => {
  try {
    await signUpRepostiory(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
