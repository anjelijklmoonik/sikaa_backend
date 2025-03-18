import { Context } from "hono";
import {
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from "../services/admin";

export const createAdminController = async (c: Context) => {
  try {
    // const user = c.get("user");
    // if (user?.role !== "ADMIN") {
    //   return c.json(
    //     {
    //       status: false,
    //       message: "Akses ditolak. Anda bukan admin",
    //       data: null,
    //     },
    //     403
    //   );
    // }

    const { username, password } = await c.req.json();

    const newAdmin = await createAdminService(username, password);
    return c.json(
      {
        message: "Admin berhasil dibuat",
        data: newAdmin,
      },
      201
    );
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const updateAdminController = async (c: Context) => {
  try {
    const userId = Number(c.req.param("id"));
    const { username, password, role } = await c.req.json();
    const updatedAdmin = await updateAdminService(userId, {
      username,
      password,
      role,
    });
    return c.json(
      {
        message: "Admin berhasil diupdate",
        data: updatedAdmin,
      },
      200
    );
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deleteAdminController = async (c: Context) => {
  try {
    const userId = Number(c.req.param("id"));
    const result = await deleteAdminService(userId);
    return c.json({ message: "Penghapusan berhasil", data: null }, 200);
  } catch (error: any) {
    return c.json({ error: "Penghapusan gagal" }, 500);
  }
};
