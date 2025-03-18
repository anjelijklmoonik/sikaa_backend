import { countStudentSMA } from "./../repositories/user";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { Context } from "hono";
import {
  createProfileService,
  getAllProfilesService,
  getProfileByIdService,
  updateProfileService,
  deleteProfileService,
  countStudentSMAService,
  countStudentSMKService,
} from "../services/user";

// export const createStudentProfileController = async (c: Context) => {
//   try {
//     const {
//       nama,
//       noIndukSiswa,
//       sekolah,
//       kelas,
//       jurusanId,
//       alamat,
//       ttl,
//       jenisKelamin,
//     } = await c.req.json();

//     if (
//       !nama ||
//       !noIndukSiswa ||
//       !sekolah ||
//       !kelas ||
//       !alamat ||
//       !ttl ||
//       !jenisKelamin
//     ) {
//       return c.json(
//         { message: "Semua field wajib diisi kecuali jurusanId." },
//         400
//       );
//     }

//     const profileData = {
//       nama,
//       noIndukSiswa,
//       sekolah,
//       kelas,
//       jurusanId: jurusanId || null,
//       alamat,
//       ttl,
//       jenisKelamin,
//     };

//     const newProfile = await createProfileService(profileData);

//     return c.json(
//       { message: "Profil siswa berhasil dibuat.", data: newProfile },
//       201
//     );
//   } catch (error: any) {
//     console.error("Error creating student profile:", error);

//     return c.json(
//       {
//         message: "Terjadi kesalahan saat membuat profil siswa.",
//         error: error.message,
//       },
//       500
//     );
//   }
// };

export const createStudentProfileController = async (c: Context) => {
  try {
    const {
      nama,
      noIndukSiswa,
      sekolah,
      kelas,
      jurusanId,
      alamat,
      ttl,
      jenisKelamin,
    } = await c.req.json();

    if (
      !nama ||
      !noIndukSiswa ||
      !sekolah ||
      !kelas ||
      !alamat ||
      !ttl ||
      !jenisKelamin
    ) {
      return c.json(
        { message: "Semua field wajib diisi kecuali jurusanId." },
        400
      );
    }

    const profileData = {
      nama,
      noIndukSiswa,
      sekolah,
      kelas,
      jurusanId: jurusanId || null,
      alamat,
      ttl,
      jenisKelamin,
    };

    const newProfile = await createProfileService(profileData);

    return c.json(
      { message: "Profil siswa berhasil dibuat.", data: newProfile },
      201
    );
  } catch (error: any) {
    console.error("Error creating student profile:", error);

    return c.json(
      {
        message:
          error.message || "Terjadi kesalahan saat membuat profil siswa.",
      },
      500
    );
  }
};

export const getAllStudentProfilesController = async (c: Context) => {
  try {
    // Ambil query parameter dengan nilai default yang lebih aman
    const page = Math.max(parseInt(c.req.query("page") || "1", 10), 1);
    const limit = Math.max(parseInt(c.req.query("limit") || "10", 10), 1);

    const profiles = await getAllProfilesService(page, limit);

    return c.json(profiles);
  } catch (error: any) {
    console.error("Error saat mengambil data profil:", error);
    return c.json(
      { error: "Terjadi kesalahan saat membaca data profil." },
      500
    );
  }
};

export const getStudentProfileByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    const profile = await getProfileByIdService(id);
    return c.json(profile);
  } catch (error) {
    return c.json({ error: "Profil tidak ditemukan" }, 404);
  }
};

export const updateStudentProfileController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  try {
    const updatedProfile = await updateProfileService(id, data);
    return c.json(updatedProfile);
  } catch (error) {
    return c.json({ error: "Tidak bisa mengubah data" }, 400);
  }
};

export const updateStudentProfileByTokenController = async (c: Context) => {
  try {
    const user = c.get("user");
    const data = await c.req.json();
    console.log("Data yang diterima:", data);

    // Cek apakah user.id ada
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

    const updatedProfile = await updateProfileService(
      userData.studentProfilId,
      data
    );
    return c.json(
      { message: "Profil berhasil diubah", data: updatedProfile },
      200
    );
  } catch (error) {
    console.error("Error saat update profil:", error);
    return c.json({ error: "Gagal mengupdate profil" }, 400);
  }
};

export const deleteStudentProfileController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    await deleteProfileService(id);
    return c.json({ message: "Penghapusan berhasil" });
  } catch (error) {
    return c.json({ error: "Penghapusan gagal" }, 400);
  }
};

export const countStudentController = async (c: Context) => {
  try {
    const SMA = await countStudentSMAService();
    const SMK = await countStudentSMKService();

    console.log("SMA:", SMA, "SMK:", SMK);

    if (SMA === 0 && SMK === 0) {
      return c.json({ error: "Tidak ada siswa yang ditemukan" }, 404);
    }

    return c.json({
      message: "Berhasil menghitung jumlah siswa",
      data: { SMA, SMK },
    });
  } catch (error) {
    const err = error as any;
    return c.json(
      { error: `Gagal menghitung jumlah siswa: ${err.message}` },
      500
    );
  }
};
