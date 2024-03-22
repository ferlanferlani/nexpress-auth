import { getAllUser } from "../../repositories/user.js";

export const getAll = async (req, res) => {
  try {
    await getAllUser(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
