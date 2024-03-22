import jwt from "jsonwebtoken";

export const extractToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  req.token = accessToken;
  next();
};
export const verifyToken = (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({
        message: "Token not privided",
      });
    }

    // access token is already exists
    const decoded = jwt.verify(req.token, process.env.ACCESS_TOKEN);
    req.email = decoded.email;
  } catch (error) {
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
