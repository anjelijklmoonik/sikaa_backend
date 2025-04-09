import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import prisma from "./database";
import { sign } from "hono/jwt";

const auth = new Hono().basePath("/auth");

// schema
const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

auth.post("/login", zValidator("json", loginSchema), async (c) => {
  const { password, username } = c.req.valid("json");
  const user = await prisma.users.findUnique({ where: { username } });
  if (!user) return c.json({ error: "User tidak ditemukan" }, 404);
  const isValid = await Bun.password.verify(password, user.password, "bcrypt");
  if (!isValid) return c.json({ error: "Password salah" }, 400);
  const token = await sign({ userId: user.id }, "verysecretkey");
  return c.json({ message: "login successfull", token, userId: user.id }, 200);
});

export default auth;
