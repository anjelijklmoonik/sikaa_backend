import prisma from "../../../configs/database";

export const findUserByUsername = async (username: string) => {
  return prisma.users.findUnique({ where: { username } });
};
