import { MemberKelas } from "./../../../../node_modules/.prisma/client/index.d";
import * as attendanceService from "../services/attendance";
import { Context } from "hono";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const createAttendance = async (c: Context) => {
//   try {
//     const attendance = await c.req.json();
//     const newAttendance = await attendanceService.createAttendance(attendance);
//     return c.json(newAttendance, 201);
//   } catch (error) {
//     return c.json({ error: "Terjadi kesalahan internal" }, 500);
//   }
// };

// export const getAllAttendance = async (c: Context) => {
//   try {
//     const attendance = await attendanceService.getAllAttendance();
//     return c.json(attendance, 200);
//   } catch (error) {
//     return c.json({ error: "Terjadi kesalahan internal" }, 500);
//   }
// };

// export const getAttendanceById = async (c: Context) => {
//   try {
//     const id = c.req.param("id");
//     const attendance = await attendanceService.getAttendanceById(Number(id));
//     return c.json(attendance, 200);
//   } catch (error) {
//     return c.json({ error: "Terjadi kesalahan internal" }, 500);
//   }
// };

// export const updateAttendance = async (c: Context) => {
//   try {
//     const id = c.req.param("id");
//     const attendance = await c.req.json();
//     const updatedAttendance = await attendanceService.updateAttendance(
//       Number(id),
//       attendance
//     );
//     return c.json(updatedAttendance, 200);
//   } catch (error) {
//     return c.json({ error: "Terjadi kesalahan internal" }, 500);
//   }
// };

// export const deleteAttendance = async (c: Context) => {
//   try {
//     const id = c.req.param("id");
//     await attendanceService.deleteAttendance(Number(id));
//     return c.json({ message: "Data berhasil dihapus" }, 200);
//   } catch (error) {
//     return c.json({ error: "Terjadi kesalahan internal" }, 500);
//   }
// };

export const createAttendanceHandler = async (c: Context) => {
  try {
    const attendance = await c.req.json();
    // console.log("attendance", attendance);

    const newAttendance = await attendanceService.createAttendance(attendance);
    return c.json(newAttendance, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getAttendanceSummary = async (c: Context) => {
  try {
    const studentId = Number(c.req.param("studentId"));
    if (isNaN(studentId)) {
      return c.json({ error: "ID siswa tidak valid" }, 400);
    }
    const summary = await attendanceService.getStudentAttendanceSummary(
      studentId
    );
    return c.json(summary, 200);
  } catch (error) {
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

// export const getStudentAbsensi = async (c: Context) => {
//   try {
//     const user = c.get("user");

//     if (!user || !user.studentProfilId) {
//       return c.json(
//         {
//           status: false,
//           message: "Akses ditolak. Anda bukan siswa",
//           data: null,
//         },
//         403
//       );
//     }

//     const absensi = await attendanceService.getStudentAbsensi(
//       user.studentProfilId
//     );

//     return c.json(
//       {
//         status: true,
//         message: "Data absensi ditemukan",
//         data: absensi,
//       },
//       200
//     );
//   } catch (error: any) {
//     return c.json(
//       {
//         status: false,
//         message: "Terjadi kesalahan",
//         error: error.message,
//         data: null,
//       },
//       500
//     );
//   }
// };

export const getStudentAbsensi = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.userId) {
      return c.json({ error: "Unauthorized: userId tidak ditemukan" }, 401);
    }

    const userData = await prisma.users.findUnique({
      where: { id: user.userId },
      select: { studentProfilId: true },
    });

    if (!userData || !userData.studentProfilId) {
      return c.json({ error: "Student profile tidak ditemukan" }, 404);
    }

    console.log("studentProfilId:", userData.studentProfilId);

    const absensi = await attendanceService.getStudentAbsensi(
      userData.studentProfilId
    );

    return c.json(
      {
        status: true,
        message: "Data absensi ditemukan",
        data: absensi,
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        status: false,
        message: "Terjadi kesalahan",
        error: error.message,
        data: null,
      },
      500
    );
  }
};

export const getStudentAbsensiByParent = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.userId) {
      return c.json({ error: "Unauthorized: userId tidak ditemukan" }, 401);
    }

    const userData = await prisma.users.findUnique({
      where: { id: user.userId },
      select: { studentProfilId: true },
    });

    if (!userData || !userData.studentProfilId) {
      return c.json({ error: "Student profile tidak ditemukan" }, 404);
    }

    console.log("studentProfilId:", userData.studentProfilId);

    const absensi = await attendanceService.getStudentAbsensi(
      userData.studentProfilId
    );

    return c.json(
      {
        status: true,
        message: "Data absensi ditemukan",
        data: absensi,
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        status: false,
        message: "Terjadi kesalahan",
        error: error.message,
        data: null,
      },
      500
    );
  }
};

export const getFormDataAbsensi = async (c: Context) => {
  try {
    const formData = await attendanceService.getFormDataAbsensi();
    return c.json(
      {
        message: "Data form berhasil diambil",
        data: formData,
      },
      200
    );
  } catch (error) {
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};
