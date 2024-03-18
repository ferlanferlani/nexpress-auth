import prisma from "../services/prisma.js";
import crypto from "crypto";

export const save = async (userId, name, email, token) => {
  // token is expired on 45 minutes
  const currentDate = new Date();
  const expirationTime = new Date(currentDate.getTime() + 1 * 60000);

  try {
    const tokenSaved = await prisma.verificationTokens.create({
      data: {
        name: name,
        email: email,
        token: token,
        expired: expirationTime,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log({
      sucsess: true,
      data: tokenSaved,
    });
  } catch (error) {
    console.log(error);
  }
};

// update verification token
export const update = async (verificationTokenId) => {
  try {
    const verificationTokens = await prisma.verificationTokens.findUnique({
      where: {
        id: verificationTokenId,
      },
    });

    const newToken = (verificationTokens.token = crypto
      .randomBytes(32)
      .toString("hex"));

    const newExpirationTime = expirationTime;

    await prisma.verificationTokens.update({
      where: {
        id: verificationTokenId,
      },
      data: {
        expired: newExpirationTime,
        token: newToken,
        isExpired: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
