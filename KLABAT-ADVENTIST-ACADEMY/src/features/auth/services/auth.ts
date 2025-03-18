import { findUserByUsername } from "../repositories/auth";
import { findUserById } from "../../users/repositories/user";
import { sign, verify } from "hono/jwt";
import * as bcrypt from "bcrypt";

export const loginService = async (
  username: string,
  password: string,
  expectedRole: string
) => {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  // Validasi password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Password salah");
  }

  // Validasi role
  if (user.role !== expectedRole) {
    throw new Error("Akses ditolak: Role tidak sesuai");
  }

  // Sertakan role ke dalam payload token
  const token = await sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET || "defaultsecret"
  );

  return { token, userId: user.id, role: user.role };
};

// export const loginService = async (username: string, password: string) => {
//   const user = await findUserByUsername(username);

//   if (!user) {
//     throw new Error("User tidak ditemukan");
//   }

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) {
//     throw new Error("Password salah");
//   }

//   // Sertakan role ke dalam payload token
//   const token = await sign(
//     { userId: user.id, role: user.role },
//     process.env.JWT_SECRET || "defaultsecret"
//   );

//   return { token, userId: user.id, role: user.role };
// };

export const whoamiService = async (token: string) => {
  try {
    const decoded = await verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    );

    const user = await findUserById(Number(decoded.userId));

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    throw new Error("Token tidak valid atau user tidak ditemukan");
  }
};
