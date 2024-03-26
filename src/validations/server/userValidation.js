import prisma from "../../services/prismaService.js";

export const userValidation = async (email) => {
  const userAlreadyExists = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (userAlreadyExists) {
    return {
      status: false,
      errorMessage: "Email ini sudah terdaftar!",
    };
  }

  return {
    status: true,
  };
};
