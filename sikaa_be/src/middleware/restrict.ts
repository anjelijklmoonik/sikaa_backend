import { Context } from "hono";
import { verify } from "hono/jwt";

export const authenticate = async (c: Context, next: () => Promise<void>) => {
  const authorization = c.req.header("Authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c.json(
      {
        status: false,
        message: "Token tidak ditemukan atau format tidak valid",
        data: null,
      },
      401
    );
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await verify(token, process.env.JWT_SECRET as string);
    console.log("Token Decoded:", decoded);

    c.set("user", decoded);
    await next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return c.json(
      {
        status: false,
        message: "Token tidak valid",
        data: null,
      },
      401
    );
  }
};

export const authorizeAdmin = (c: Context, next: () => Promise<void>) => {
  const user = c.get("user");

  if (!user || user.role !== "ADMIN") {
    return c.json(
      {
        status: false,
        message: "Akses ditolak. Anda bukan admin",
        data: null,
      },
      403
    );
  }

  return next();
};

export const authorizeStudent = (c: Context, next: () => Promise<void>) => {
  const user = c.get("user");

  if (!user || user.role !== "STUDENT") {
    return c.json(
      {
        status: false,
        message: "Akses ditolak. Anda bukan mahasiswa",
        data: null,
      },
      403
    );
  }

  return next();
};

export const authorizeParent = (c: Context, next: () => Promise<void>) => {
  const user = c.get("user");

  if (!user || user.role !== "ORANGTUA") {
    return c.json(
      {
        status: false,
        message: "Akses ditolak. Anda bukan orang tua",
        data: null,
      },
      403
    );
  }

  return next();
};
