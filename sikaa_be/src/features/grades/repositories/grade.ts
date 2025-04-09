import { Prisma } from "@prisma/client";
import prisma from "../../../configs/database";

// export const nilaiRepository = {
//   // Menambahkan nilai baru
//   async create(data: { skor: number; mapelId: number; memberKelasId: number }) {
//     return prisma.nilai.create({ data });
//   },

//   // Mengambil semua nilai
//   async getAll() {
//     return prisma.nilai.findMany({ include: { MemberKelas: true } });
//   },

//   // Mengambil nilai berdasarkan ID
//   async getById(id: number) {
//     return prisma.nilai.findUnique({
//       where: { id },
//       include: { MemberKelas: true },
//     });
//   },

//   // Mengupdate nilai
//   async update(id: number, data: { skor?: number; mapelId?: number }) {
//     return prisma.nilai.update({ where: { id }, data });
//   },

//   // Menghapus nilai
//   async delete(id: number) {
//     return prisma.nilai.delete({ where: { id } });
//   },
// };

export const createNilai = async (
  studentProfileId: number, // Gunakan studentProfileId
  mapelKelasId: number,
  skor: number
) => {
  // Pastikan skor dalam rentang yang valid
  if (typeof skor !== "number" || skor < 0 || skor > 100) {
    throw new Error("Skor harus berupa angka antara 0 dan 100.");
  }

  // Cari apakah studentProfileId terdaftar di kelas yang memiliki mapelKelasId
  const member = await prisma.memberKelas.findFirst({
    where: {
      studentId: studentProfileId,
      Kelas: {
        MapelKelas: {
          some: { id: mapelKelasId },
        },
      },
    },
    select: { id: true }, // Ambil hanya id untuk memberKelas
  });

  if (!member) {
    throw new Error(
      "Siswa tidak terdaftar dalam kelas yang memiliki mata pelajaran ini."
    );
  }

  // Jika valid, buat data baru dengan memberKelasId yang ditemukan
  return await prisma.nilai.create({
    data: {
      memberKelasId: member.id,
      mapelKelasId,
      skor,
      studentProfilId: studentProfileId,
    },
  });
};

export const getNilaiByKelas = async (kelasId: number, semester: string) => {
  return prisma.nilai.findMany({
    where: {
      MemberKelas: {
        kelasId,
        Kelas: {
          semester: semester as any,
        },
      },
    },
    include: {
      MemberKelas: {
        include: { StudentProfil: true },
      },
      MapelKelas: {
        include: { Mapel: true },
      },
    },
  });
};

export const updateNilai = async (id: number, skor: number) => {
  return prisma.nilai.update({
    where: { id },
    data: { skor },
  });
};

export const getGradesLessonByStudent = async (studentId: number) => {
  const grades = await prisma.nilai.findMany({
    where: {
      StudentProfil: {
        MemberKelas: {
          some: {
            studentId: studentId, // Menyesuaikan dengan kelas student
          },
        },
      },
    },
    select: {
      skor: true,
      MapelKelas: {
        select: {
          Mapel: {
            select: {
              namaMapel: true,
            },
          },
        },
      },
    },
  });

  // **Memformat response agar sesuai dengan permintaan**
  const formattedResponse: Record<string, { skor: number }> = {};

  grades.forEach((grade) => {
    const subjectName = grade.MapelKelas.Mapel.namaMapel || "Unknown"; // Jaga-jaga jika null
    formattedResponse[subjectName] = { skor: grade.skor };
  });

  return formattedResponse;
};

export const getFormData = async () => {
  try {
    const jurusan = await prisma.jurusan.findMany({
      include: {
        Kelas: {
          include: {
            MemberKelas: {
              include: {
                StudentProfil: {
                  include: {
                    MemberKelas: {
                      include: {
                        Kelas: {
                          include: {
                            MapelKelas: {
                              include: {
                                Mapel: {
                                  select: {
                                    id: true,
                                    namaMapel: true,
                                  },
                                },
                                nilai: {
                                  select: {
                                    skor: true,
                                    studentProfilId: true,
                                  },
                                },
                                Absensi: {
                                  select: {
                                    status: true,
                                    studentProfilId: true,
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return jurusan;
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw new Error("Gagal mengambil data formulir");
  }
};

// export const createNili = async (data: Prisma.NilaiUncheckedCreateInput) => {
//   return prisma.nilai.create({ data });
// };
// export const getNilaiByKelas = async (kelasId: number, semester: string) => {
//   return prisma.nilai.findMany({
//     where: {
//       MemberKelas: {
//         Kelas: {
//           id: kelasId,
//           semester: semester as any,
//         },
//       },
//     },
//     include: {
//       MemberKelas: {
//         include: { StudentProfil: true },
//       },
//       MapelKelas: {
//         include: { Mapel: true },
//       },
//     },
//   });
// };

// export const updateNilai = async (id: number, skor: number) => {
//   return prisma.nilai.update({
//     where: { id },
//     data: { skor },
//   });
// };
