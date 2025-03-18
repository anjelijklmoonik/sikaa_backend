import { Hono, Context as HonoContext } from "hono";
import prisma from "./database";
import { Role } from "@prisma/client";

const user = new Hono();

// CREATE users
user.post("/users", async (c) => {
  const { username, password, role, studentProfilId } = await c.req.json();
  if (role !== "STUDENT" && role !== "ORANGTUA") {
    return c.json({ error: "Role salah" }, 400);
  }
  const userData: any = {
    username,
    password,
    role:
      role === "ORANGTUA"
        ? Role.ORANGTUA
        : role === "STUDENT"
        ? Role.STUDENT
        : Role,
  };
  if (role === "STUDENT") {
    if (!studentProfilId) {
      return c.json({ error: "Student harus memiliki Student ID" });
    }
    userData.studentProfilId = studentProfilId;
  }

  try {
    const newUser = await prisma.users.create({
      data: userData,
    });
    return c.json(newUser, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Tidak bisa membuat user baru" }, 400);
  }
});

// READ all
user.get("/users", async (c: HonoContext) => {
  try {
    const users = await prisma.users.findMany();
    return c.json(users, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Error membaca user" }, 500);
  }
});
// READ one
user.get("/users/:id", async (c: HonoContext) => {
  const id = Number(c.req.param("id"));
  try {
    const users = await prisma.users.findUnique({
      where: { id },
    });
    if (!users) {
      return c.json({ error: "User tidak bisa terbaca" }, 404);
    }
    return c.json(users, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Tidak bisa membaca user" });
  }
});

// UPDATE users
user.put("/users/:id", async (c: HonoContext) => {
  const id = Number(c.req.param("id"));
  try {
    const { username, password, role } = await c.req.json();
    const updateUser = await prisma.users.update({
      where: { id },
      data: { username, password, role },
    });
    return c.json(updateUser, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
});

// DELETE users
user.delete("/users/:id", async (c: HonoContext) => {
  const id = Number(c.req.param("id"));
  try {
    await prisma.users.delete({
      where: { id },
    });
    return c.json({ message: "Penghapusan berhasil" }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
});

export default user;
