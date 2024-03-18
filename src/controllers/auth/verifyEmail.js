import prisma from "../../services/prisma.js";

export const verifyEmail = async (req, res) => {
  const tokenfromUrl = req.query.token;

  try {
    const expiredToken = await prisma.verificationTokens.findFirst({
      where: {
        expired: {
          lt: new Date(),
        },
      },
    });

    if (expiredToken) {
      await prisma.verificationTokens.delete({
        where: {
          id: expiredToken.id,
        },
      });
      return res.status(400).send({
        error: "Token Expired",
      });
    }

    const verificationToken = await prisma.verificationTokens.findFirst({
      where: {
        token: tokenfromUrl,
      },
    });

    if (!verificationToken) {
      return res.status(400).send({
        error: "Invalid Token",
      });
    }

    await prisma.users.update({
      where: {
        id: verificationToken.userId,
      },
      data: {
        emailVerified: true,
      },
    });

    res.status(200).send("Email Verified");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
