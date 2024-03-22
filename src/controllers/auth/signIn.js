import * as argon2 from "argon2";
import prisma from "../../services/prisma.js";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "user not registered!" });
    }

    const passwordIsMatch = await argon2.verify(user.password, password);
    if (!passwordIsMatch) {
      return res.status(400).json({ error: "Password or email incorrect" });
    }

    const userEmail = user.email;
    const userId = user.id;
    const userName = user.name;

    const refreshToken = jwt.sign(
      {
        userId,
        userEmail,
        userName,
      },
      process.env.REFRESH_TOKEN
    );

    const accessToken = jwt.sign(
      {
        userId,
        userEmail,
        userName,
      },
      process.env.ACCESS_TOKEN
    );

    res.cookie("refresh_token", refreshToken);

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    res.status(200).json({
      success: true,
      message: "login successfully!",
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
