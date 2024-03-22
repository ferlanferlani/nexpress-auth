import prisma from "../../services/prismaService.js";
import jwt from "jsonwebtoken";

export const logoutRepository = async (req, res) => {
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
