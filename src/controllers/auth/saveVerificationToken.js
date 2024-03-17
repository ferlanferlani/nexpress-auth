import prisma from "../../services/prisma.js";

export const saveVerificationToken = async (userId, name, email, token) => {
  try {
    const verificationToken = await prisma.verificationTokens.create({
      data: {
        name: name,
        email: email,
        token: token,
        userId: userId,
      },
    });
    console.log({
      sucsess: true,
      data: verificationToken,
    });
  } catch (error) {
    console.log(error);
  }
};
