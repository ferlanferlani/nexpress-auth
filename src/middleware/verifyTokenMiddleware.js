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

    const userRefreshTokenIsNull = await prisma.users.findFirst({
      where: {
        refreshToken: null,
      },
    });

    if (userRefreshTokenIsNull) {
      return res.status(401).json({
        error: "your are logout cant access",
      });
    }

    req.email = decoded.userEmail;
  } catch (error) {
    // if access token is invalid
    if (
      error.name === "JsonWebTokenError" ||
      error.message === "jwt malformed" ||
      error.message === "invalid signature"
    ) {
      return res.status(401).json({
        error: "Invalid token: Token is malformed or has an invalid signature",
      });
    } else if (
      error.name === "TokenExpiredError" ||
      error.message === "jwt expired"
    ) {
      return res.status(401).json({
        error: "Token expired: Please login again to obtain a new token",
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
        error: error.message,
      });
    }
  }
  next();
};
