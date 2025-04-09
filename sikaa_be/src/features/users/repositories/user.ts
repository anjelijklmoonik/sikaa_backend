import prisma from "../../../configs/database";
import studentProfil from "../../../routes/studentProfileRoutes";

export const createUser = async (data: any) => {
  return await prisma.users.create({ data });
};

export const findUserById = async (id: number) => {
  return prisma.users.findUnique({
    where: { id },
    include: {
      studentProfil: true,
    },
  });
};
