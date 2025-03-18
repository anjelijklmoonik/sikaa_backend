import {
  createStudentProfile,
  findAllStudentProfiles,
  findStudentProfileById,
  updateStudentProfileById,
  deleteStudentProfileById,
  countStudentSMA,
  countStudentSMK,
} from "../repositories/user";
import { createUser } from "../../users/repositories/user";
import { addFinance } from "../../finances/repositories/finance";
import * as bcrypt from "bcrypt";
import prisma from "../../../configs/database";

// export const createProfileService = async (data: any) => {
//   const { noIndukSiswa, sekolah, ...rest } = data;

//   try {
//     return await prisma.$transaction(async (tx) => {
//       // **1. Buat profil siswa sekaligus dengan keuangan**
//       const newStudentProfile = await tx.studentProfil.create({
//         data: {
//           ...rest,
//           noIndukSiswa,
//           sekolah,
//         },
//       });

//       // **2. Tambahkan data keuangan untuk siswa**
//       await tx.keuangan.create({
//         data: {
//           StudentProfil: { connect: { id: newStudentProfile.id } },
//           lastTransDate: new Date(),
//           debit: 0,
//           kredit: 0,
//           total: 0,
//         },
//       });

//       // **3. Hash password siswa**
//       const studentPassword = noIndukSiswa + sekolah;
//       const hashedStudentPassword = await bcrypt.hash(studentPassword, 10);

//       // **4. Buat akun user untuk siswa**
//       await createUser({
//         username: noIndukSiswa,
//         password: hashedStudentPassword,
//         role: "STUDENT",
//         studentProfilId: newStudentProfile.id,
//       });

//       // **5. Hash password orang tua**
//       const parentPassword = noIndukSiswa + sekolah;
//       const hashedParentPassword = await bcrypt.hash(parentPassword, 10);

//       // **6. Buat akun user untuk orang tua**
//       await createUser({
//         username: noIndukSiswa + "ortu",
//         password: hashedParentPassword,
//         role: "ORANGTUA",
//         studentProfilId: newStudentProfile.id,
//       });

//       return newStudentProfile;
//     });
//   } catch (error) {
//     console.error("Error creating student profile:", error);
//     throw new Error("Gagal membuat profil siswa. Silakan coba lagi.");
//   }
// };

// export const createProfileService = async (data: any) => {
//   const { noIndukSiswa, sekolah, ...rest } = data;

//   const studentProfileData = { ...rest, noIndukSiswa, sekolah };
//   const newStudentProfile = await createStudentProfile(studentProfileData);

//   const financeData = {
//     lastTransDate: new Date(),
//     debit: 0,
//     kredit: 0,
//     total: 0,
//     studentId: newStudentProfile.id,
//   };
//   await addFinance(financeData);

//   const studentPassword = noIndukSiswa + sekolah;
//   const hashedStudentPassword = await bcrypt.hash(studentPassword, 10);
//   const studentUser = await createUser({
//     username: noIndukSiswa,
//     password: hashedStudentPassword,
//     role: "STUDENT",
//     studentProfilId: newStudentProfile.id,
//   });

//   const parentPassword = noIndukSiswa + sekolah;
//   const hashedParentPassword = await bcrypt.hash(parentPassword, 10);
//   const parentUser = await createUser({
//     username: noIndukSiswa + "ortu",
//     password: hashedParentPassword,
//     role: "ORANGTUA",
//     studentProfilId: newStudentProfile.id,
//   });

//   return await prisma.studentProfil.findUnique({
//     where: { id: newStudentProfile.id },
//     include: {
//       Jurusan: true,
//       users: true,
//       Keuangan: true,
//     },
//   });
// };

export const createProfileService = async (data: any) => {
  return await prisma.$transaction(async (prisma) => {
    try {
      const { noIndukSiswa, sekolah, ...rest } = data;

      const existingStudent = await prisma.studentProfil.findUnique({
        where: { noIndukSiswa },
      });

      if (existingStudent) {
        console.warn(`NIS ${noIndukSiswa} sudah ada. Melewati data ini.`);
        // return null; // Skip data jika NIS sudah ada
      }

      const studentProfileData = { ...rest, noIndukSiswa, sekolah };
      const newStudentProfile = await createStudentProfile(studentProfileData);

      const financeData = {
        lastTransDate: new Date(),
        debit: 0,
        kredit: 0,
        total: 0,
        studentId: newStudentProfile.id,
      };
      await addFinance(financeData);

      const studentPassword = noIndukSiswa + sekolah;
      const hashedStudentPassword = await bcrypt.hash(studentPassword, 10);
      await createUser({
        username: noIndukSiswa,
        password: hashedStudentPassword,
        role: "STUDENT",
        studentProfilId: newStudentProfile.id,
      });

      const parentPassword = noIndukSiswa + sekolah;
      const hashedParentPassword = await bcrypt.hash(parentPassword, 10);
      await createUser({
        username: noIndukSiswa + "ortu",
        password: hashedParentPassword,
        role: "ORANGTUA",
        studentProfilId: newStudentProfile.id,
      });

      return await prisma.studentProfil.findUnique({
        where: { id: newStudentProfile.id },
        include: {
          Jurusan: true,
          users: true,
          Keuangan: true,
        },
      });
    } catch (error) {
      throw new Error(
        (error as any).message || "Terjadi kesalahan saat membuat profil siswa."
      );
    }
  });
};

// export const createProfileService = async (data: any) => {
//   data.Keuangan = {
//     create: {
//       lastTransDate: new Date(),
//       debit: 0,
//       kredit: 0,
//       total: 0,
//     },
//   };
//   return await createStudentProfile(data);
// };

export const getAllProfilesService = async (page: number, limit: number) => {
  return await findAllStudentProfiles(page, limit);
};

export const getProfileByIdService = async (id: number) => {
  const profile = await findStudentProfileById(id);
  if (!profile) {
    throw new Error("Profil tidak ditemukan");
  }
  return profile;
};

export const updateProfileService = async (id: number, data: any) => {
  return await updateStudentProfileById(id, data);
};

export const deleteProfileService = async (id: number) => {
  return await deleteStudentProfileById(id);
};

export const countStudentSMAService = async () => {
  return await countStudentSMA();
};

export const countStudentSMKService = async () => {
  return await countStudentSMK();
};
