import * as argon2 from "argon2";
import prisma from "../../services/prismaService.js";
import jwt from "jsonwebtoken";
import { signInValidation } from "../../validations/form/auth/signInValidation.js";

export const signInRepository = async (req, res) => {
  const { email, password } = req.body;

  // ** SignIn Validaton
  const validation = signInValidation(email, password);
  if (!validation.status) {
    return res.status(400).json({ error: validation.errorMessage });
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    const userEmailIsNotVerified = await prisma.users.findFirst({
      where: {
        emailVerified: false,
      },
    });

    if (userEmailIsNotVerified) {
      return res.status(400).json({ error: "Please verify your email first!" });
    }

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
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    const accessToken = jwt.sign(
      {
        userId,
        userEmail,
        userName,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15s",
      }
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

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
