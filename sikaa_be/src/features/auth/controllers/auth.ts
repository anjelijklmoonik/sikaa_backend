import { loginService, whoamiService } from "../services/auth";
import { Context } from "hono";

export const loginAdminController = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    // Validasi dengan role ADMIN
    const { token, userId, role } = await loginService(
      username,
      password,
      "ADMIN"
    );

    return c.json(
      {
        message: "Login berhasil sebagai admin",
        token,
        userId,
        role,
      },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User tidak ditemukan") {
        return c.json({ error: "User tidak ditemukan" }, 404);
      }
      if (error.message === "Password salah") {
        return c.json({ error: "Password salah" }, 400);
      }
      if (error.message === "Akses ditolak: Role tidak sesuai") {
        return c.json({ error: "Akses ditolak: Anda bukan admin" }, 403);
      }
    }

    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

export const loginStudentController = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    // Validasi dengan role STUDENT
    const { token, userId, role } = await loginService(
      username,
      password,
      "STUDENT"
    );

    return c.json(
      {
        message: "Login berhasil sebagai student",
        token,
        userId,
        role,
      },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User tidak ditemukan") {
        return c.json({ error: "User tidak ditemukan" }, 404);
      }
      if (error.message === "Password salah") {
        return c.json({ error: "Password salah" }, 400);
      }
      if (error.message === "Akses ditolak: Role tidak sesuai") {
        return c.json({ error: "Akses ditolak: Anda bukan student" }, 403);
      }
    }

    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

export const loginParentController = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    // Validasi dengan role ORANGTUA
    const { token, userId, role } = await loginService(
      username,
      password,
      "ORANGTUA"
    );

    return c.json(
      {
        message: "Login berhasil sebagai orangtua",
        token,
        userId,
        role,
      },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User tidak ditemukan") {
        return c.json({ error: "User tidak ditemukan" }, 404);
      }
      if (error.message === "Password salah") {
        return c.json({ error: "Password salah" }, 400);
      }
      if (error.message === "Akses ditolak: Role tidak sesuai") {
        return c.json({ error: "Akses ditolak: Anda bukan orangtua" }, 403);
      }
    }

    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

// export const loginController = async (c: Context) => {
//   try {
//     const { username, password } = await c.req.json();

//     const { token, userId, role } = await loginService(username, password);

//     return c.json(
//       {
//         message: "Login berhasil",
//         token,
//         userId,
//         role,
//       },
//       200
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       if (error.message === "User tidak ditemukan") {
//         return c.json({ error: "User tidak ditemukan" }, 404);
//       }
//       if (error.message === "Password salah") {
//         return c.json({ error: "Password salah" }, 400);
//       }
//     }

//     return c.json({ error: "Terjadi kesalahan internal" }, 500);
//   }
// };

export const whoamiController = async (c: Context) => {
  try {
    const authorization = c.req.header("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return c.json(
        {
          status: false,
          message: "Token tidak disertakan atau format tidak valid",
          data: null,
        },
        401
      );
    }

    const token = authorization.split(" ")[1];

    // Panggil service untuk mendapatkan informasi pengguna
    const user = await whoamiService(token);

    return c.json(
      {
        status: true,
        message: "Informasi pengguna berhasil diambil",
        data: user,
      },
      200
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat mengambil informasi pengguna";
    return c.json(
      {
        status: false,
        message: errorMessage,
        data: null,
      },
      500
    );
  }
};
