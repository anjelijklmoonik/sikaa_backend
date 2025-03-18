import { Role } from "@prisma/client";
import { createAdmin, updateAdmin, deleteAdmin } from "../repositories/admin";
import * as bcrypt from "bcrypt";

export const createAdminService = async (
  username: string,
  password: string
) => {
  if (!username || !password)
    throw new Error("Password atau Username tidak dimasukkan");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await createAdmin({
    username,
    password: hashedPassword,
    role: "ADMIN",
  });

  const { password: _, ...adminWithoutPassword } = newAdmin;
  return adminWithoutPassword;
};

export const updateAdminService = async (
  id: number,
  data: { username?: string; password?: string; role?: Role }
) => {
  if (!data.username && !data.password && !data.role) {
    throw new Error("Username, Password atau Role tidak diisi");
  }

  const updateData: any = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updatedAdmin = await updateAdmin(id, updateData);

  const { password: _, ...adminWithoutPassword } = updatedAdmin;

  return adminWithoutPassword;
};

export const deleteAdminService = async (id: number) => {
  return deleteAdmin(id);
};
