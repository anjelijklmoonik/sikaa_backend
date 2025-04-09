import { Hono, Context as HonoContext } from "hono";
import prisma from "./database";
import { adminOnly } from "./middleware";

const admin = new Hono();

// CREATE admin only
admin.post("/admin", adminOnly, async (c: HonoContext) => {
  const { username, password } = await c.req.json();
  if (!username || !password) {
    return c.json({ error: "Password atau Username tidak dimasukkan" }, 400);
  }
  try {
    const newAdmin = await prisma.users.create({
      data: { username, password, role: "ADMIN" },
    });
    return c.json(newAdmin, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Admin tidak bisa dibuat" }, 400);
  }
});

// UPDATE admin
admin.put("/admin/:id", adminOnly, async (c) => {
  const userId = Number(c.req.param("id"));
  const { username, password, role } = await c.req.json();

  if (!username && !password && !role) {
    return c.json({ error: "Username, Password atau Role tidak diisi" });
  }
  const updateData: any = {};
  if (username) updateData.username = username;
  if (password) updateData.password = password;
  if (role) updateData.role = role;

  try {
    const updateUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });
    return c.json(updateUser, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Tidak bisa mengubah data" });
  }
});

// DELETE admin
admin.delete("/admin/:id", adminOnly, async (c) => {
  const userId = Number(c.req.param("id"));
  try {
    const deleteAdmin = await prisma.users.delete({
      where: { id: userId },
    });
    return c.json({ message: "Penghapusan berhasil", deleteAdmin }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Penghapusan gagal" }, 500);
  }
});

export default admin;
