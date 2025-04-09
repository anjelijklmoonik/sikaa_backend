import prisma from "../../../configs/database";
import { Role } from "@prisma/client";

export const createAdmin = async (data: {
  username: string;
  password: string;
  role: Role;
}) => {
  return prisma.users.create({ data });
};

export const updateAdmin = async (
  id: number,
  data: Partial<{ username: string; password: string; role: Role }>
) => {
  return prisma.users.update({ where: { id }, data });
};

export const deleteAdmin = async (id: number) => {
  return prisma.users.delete({ where: { id } });
};
