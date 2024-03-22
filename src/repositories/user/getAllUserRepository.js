import prisma from "../../services/prismaService.js";

export const getAllUserRepository = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (users.length === 0) {
      return res.status(400).json({ error: "No user found" });
    }
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
