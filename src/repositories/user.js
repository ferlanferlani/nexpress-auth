import prisma from "../services/prisma.js";
import jwt from "jsonwebtoken";

export const save = async (name, email, password) => {
  return await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
      refreshToken: null,
    },
  });
};

export const getAllUser = async (req, res) => {
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

export const userLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.sendStatus(204);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
      if (err) {
        return res.sendStatus(401);
      }
    });

    const user = await prisma.users.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });

    const userId = user.id;

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
    res.clearCookie("refresh_token");
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
