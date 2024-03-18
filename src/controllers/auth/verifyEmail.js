import prisma from "../../services/prisma.js";
import { updateVerificationToken } from "./updateVerificationToken.js";

export const verifyEmail = async (req, res) => {
  const tokenfromUrl = req.query.token;
  try {
    const tokenIsExpired = await prisma.verificationTokens.findMany({
      where: {
        expired: {
          lt: new Date(),
        },
      },
    });

    if (tokenIsExpired.length > 0) {
      await prisma.verificationTokens.update({
        where: {
          token: tokenfromUrl,
        },
        data: {
          isExpired: true,
        },
      });

      // send to update verification token
      const verificationTokenId = tokenIsExpired[0].id;
      updateVerificationToken(verificationTokenId);

      return res.status(400).send("token is expired");
    }

    const token = await prisma.verificationTokens.delete({
      where: {
        token: tokenfromUrl,
      },
    });

    await prisma.users.update({
      where: {
        id: token.userId,
      },
      data: {
        emailVerified: true,
      },
    });

    res.send("Email verified successfully");
  } catch (error) {
    res.status(400).send("token is expired");
  }
};
