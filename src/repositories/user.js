import prisma from "../services/prisma.js";

export const save = async (name, email, password) => {
  return await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
};
