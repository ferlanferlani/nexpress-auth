import { getAllUserRepository } from "../../repositories/user/getAllUserRepository.js";

// *** get all user
export const getAllUserController = async (req, res) => {
  try {
    await getAllUserRepository(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// ? add more function here
// *** get user by id
export const getUserByIdController = async (req, res) => {};

// *** delete user by id
export const deleteUserByIdController = async (req, res) => {};

// *** update user by id
export const updateUserByIdController = async (req, res) => {};
