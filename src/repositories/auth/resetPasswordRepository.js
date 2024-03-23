import prisma from "../../services/prismaService.js";
import { resetPasswordValidation } from "../../validations/form/auth/resetPasswordValidation.js";
import * as argon2 from "argon2";

export const resetPasswordRepository = async (req, res) => {
  try {
    const { token } = req.query;
    const { password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token not valid",
      });
    }

    const userToken = await prisma.verificationTokens.findFirst({
      where: {
        token: token,
      },
    });

    if (!userToken) {
      return res.status(400).json({
        success: false,
        message: "token invalid",
      });
    }

    const currentDate = new Date();
    if (currentDate > userToken.expired) {
      await prisma.verificationTokens.delete({
        where: {
          id: userToken.id,
        },
      });

      return res.status(400).json({
        success: false,
        message: "token expired",
      });
    }

    const validation = resetPasswordValidation(password, confirmPassword);
    if (validation.status === false) {
      return res.status(400).json({
        success: false,
        message: validation.errorMessage,
      });
    }

    const passwordHashed = await argon2.hash(password);

    const passwordCahanged = await prisma.users.update({
      where: {
        id: userToken.userId,
      },
      data: {
        password: passwordHashed,
      },
    });

    if (passwordCahanged) {
      try {
        await prisma.verificationTokens.delete({
          where: {
            id: userToken.id,
          },
        });
      } catch (error) {
        return res.status(500).json({});
      }
      res.status(200).json({
        success: true,
        message: "password changed successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
