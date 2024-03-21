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

    // delete verification token is expired
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
        error: "Token Expired",
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

    // hapus verification token ketika verify email user sudah true dan token masih ada di database
    const userEmailVerified = await prisma.users.findFirst({
      where: {
        emailVerified: true,
      },
    });

    const userId = userEmailVerified.id;

    const verificationTokenId = await prisma.verificationTokens.findFirst({
      where: {
        userId: userId,
      },
    });

    if (userEmailVerified && verificationTokenId) {
      await prisma.verificationTokens.delete({
        where: {
          id: verificationTokenId.id,
        },
      });
    }

    res.status(200).send("Email Verified");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
