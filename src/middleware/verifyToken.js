import jwt, { decode } from "jsonwebtoken";
import prisma from "../services/prismaService.js";

export const extractToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  req.token = accessToken;
  next();
};
export const verifyToken = async (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({
        message: "Token not privided",
      });
    }

    // check apakah user yang sedang login ini ada di database

    // if access token is exists
    const decoded = jwt.verify(req.token, process.env.ACCESS_TOKEN);
    const userEmail = decoded.userEmail;

    const user = await prisma.users.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    req.email = decoded.email;
  } catch (error) {
    // if access token is invalid
    if (
      error === "jsonWebTokenError" ||
      error.message === "jwt malformed" ||
      error.message === "invalid signature"
    ) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  next();
};
