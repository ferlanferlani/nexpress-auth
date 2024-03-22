import { userLogout } from "../../repositories/auth/logoutRepositories.js";

export const logout = async (req, res) => {
  try {
    await userLogout(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
