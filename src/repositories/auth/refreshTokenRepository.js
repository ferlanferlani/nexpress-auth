import jwt from "jsonwebtoken";
import prisma from "../../services/prismaService.js";
export const refreshTokenRepository = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.sendStatus(401);
    }

    const user = await prisma.users.findFirst({
      where: {
        refreshToken: token,
      },
    });

    if (!user) {
      return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      const { userId, userName, userEmail } = decoded;

      const acessToken = jwt.sign(
        { userId, userName, userEmail },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "15s",
        }
      );
      res.status(200).json({
        success: true,
        accessToken: acessToken,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
