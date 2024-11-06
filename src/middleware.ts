import { Context as HonoContext, Next } from "hono";

export const adminOnly = async (c: HonoContext, next: Next) => {
  const userRole = c.req.header("user-role");
  console.log("User Role:", userRole);
  if (userRole?.toUpperCase() !== "ADMIN") {
    return c.json({ error: "Admin ditolak" }, 403);
  }
  await next();
};
