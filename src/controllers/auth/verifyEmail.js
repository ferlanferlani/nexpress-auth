import prisma from "../../services/prisma.js";

export const verifyEmail = async (req, res) => {
  const tokenfromUrl = req.query.token;
  try {
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
    res.status(400).send("Invalid token");
  }
};
