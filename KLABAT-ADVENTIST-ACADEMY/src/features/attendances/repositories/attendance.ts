import prisma from "../../../configs/database";

interface Attendance {
  tanggal: string;
  status: string;
  memberKelasId: number;
  mapelKelasId: number;
  studentProfileId: number;
}

// export const createAttendance = async (attendance: Attendance) => {
//   try {
//     const newAttendance = await prisma.absensi.create({
//       data: {
//         tanggal: new Date(attendance.tanggal),
//         status: attendance.status,
//         memberKelasId: attendance.memberKelasId,
//         // studentId: attendance.studentId,
//       },
//     });
//     return newAttendance;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Absen baru tidak bisa dibuat");
//   }
// };

// export const getAllAttendance = async () => {
//   try {
//     return await prisma.absensi.findMany();
//   } catch (error) {
//     console.error(error);
//     throw new Error("Absensi tidak bisa dibaca");
//   }
// };

// export const getAttendanceById = async (id: number) => {
//   try {
//     const attendance = await prisma.absensi.findUnique({
//       where: { id: Number(id) },
//     });
//     if (!attendance) throw new Error("Data tidak ditemukan");
//     return attendance;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error membaca data");
//   }
// };

// export const updateAttendance = async (id: number, attendance: Attendance) => {
//   try {
//     const updatedAttendance = await prisma.absensi.update({
//       where: { id: Number(id) },
//       data: {
//         tanggal: new Date(attendance.tanggal),
//         status: attendance.status,
//         memberKelasId: attendance.memberKelasId,
//         // studentId: attendance.studentId,
//       },
//     });
//     return updatedAttendance;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Tidak bisa mengubah data");
//   }
// };

// export const deleteAttendance = async (id: number) => {
//   try {
//     await prisma.absensi.delete({
//       where: { id: Number(id) },
//     });
//     return { message: "Penghapusan berhasil" };
//   } catch (error) {
//     console.error(error);
//     throw new Error("Tidak bisa menghapus data");
//   }
// };

const validStatuses = ["Hadir", "Izin", "Sakit", "Alpa"];
export const addAttendance = async (attendance: Attendance) => {
  // if (isNaN(Date.parse(attendance.tanggal))) {
  //   throw new Error("Format tanggal tidak valid. Gunakan format YYYY-MM-DD.");
  // }

  if (!validStatuses.includes(attendance.status)) {
    throw new Error(
      `Status harus salah satu dari: ${validStatuses.join(", ")}`
    );
  }

  const member = await prisma.memberKelas.findFirst({
    where: {
      studentId: attendance.studentProfileId,
      Kelas: {
        MapelKelas: {
          some: { id: attendance.mapelKelasId },
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!member) {
    throw new Error("Student tidak terdaftar di kelas ini.");
  }

  const existingAttendance = await prisma.absensi.findFirst({
    where: {
      studentProfilId: attendance.studentProfileId,
      mapelKelasId: attendance.mapelKelasId,
      tanggal: new Date(attendance.tanggal),
    },
  });

  if (existingAttendance) {
    throw new Error("Student sudah melakukan absensi untuk hari ini.");
  }

  const newAttendance = await prisma.absensi.create({
    data: {
      tanggal: new Date(attendance.tanggal),
      status: attendance.status,
      memberKelasId: member.id,
      mapelKelasId: attendance.mapelKelasId,
      studentProfilId: attendance.studentProfileId,
    },
  });

  return newAttendance;
};

export const countAttendanceByStudent = async (studentId: number) => {
  const attendanceCounts = await prisma.absensi.groupBy({
    by: ["mapelKelasId", "status"],
    where: {
      MemberKelas: {
        studentId: studentId,
      },
    },
    _count: {
      id: true,
    },
  });

  const formattedResult = attendanceCounts.reduce((acc, item) => {
    const { mapelKelasId, status, _count } = item;
    if (!acc[mapelKelasId]) {
      acc[mapelKelasId] = {
        Hadir: 0,
        Sakit: 0,
        Izin: 0,
        Alfa: 0,
      };
    }
    acc[mapelKelasId][status] = _count.id;
    return acc;
  }, {} as Record<number, Record<string, number>>);

  return formattedResult;
};

export const getAbsensiByStudent = async (studentProfilId: number) => {
  const attendanceCounts = await prisma.absensi.groupBy({
    by: ["mapelKelasId", "status"],
    where: {
      MemberKelas: {
        studentId: studentProfilId,
      },
    },
    _count: {
      id: true,
    },
  });

  const mapelData = await prisma.mapelKelas.findMany({
    where: {
      id: { in: attendanceCounts.map((item) => item.mapelKelasId) },
    },
    include: {
      Mapel: true,
    },
  });

  const formattedResult = mapelData.reduce((acc, mapelItem) => {
    const { id, Mapel } = mapelItem;
    acc[Mapel.namaMapel] = {
      Hadir: 0,
      Sakit: 0,
      Izin: 0,
      Alfa: 0,
    };
    return acc;
  }, {} as Record<string, Record<string, number>>);

  attendanceCounts.forEach(({ mapelKelasId, status, _count }) => {
    const mapelItem = mapelData.find((m) => m.id === mapelKelasId);
    if (mapelItem) {
      formattedResult[mapelItem.Mapel.namaMapel][status] = _count.id;
    }
  });

  return formattedResult;
};

export const getFormData = async () => {
  try {
    // Mengambil data jurusan, kelas, dan siswa
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

    // Menghitung jumlah absensi berdasarkan mapel dan status
    const attendanceCounts = await prisma.absensi.groupBy({
      by: ["mapelKelasId", "status"],
      _count: {
        id: true,
      },
    });

    // Mengambil data mapel berdasarkan absensi yang ditemukan
    const mapelData = await prisma.mapelKelas.findMany({
      where: {
        id: { in: attendanceCounts.map((item) => item.mapelKelasId) },
      },
      include: {
        Mapel: true,
      },
    });

    // Format hasil absensi per mata pelajaran
    const formattedAttendance = mapelData.reduce((acc, mapelItem) => {
      const { id, Mapel } = mapelItem;
      acc[id] = {
        namaMapel: Mapel.namaMapel,
        absensi: {
          Hadir: 0,
          Sakit: 0,
          Izin: 0,
          Alpa: 0,
        },
      };
      return acc;
    }, {} as Record<number, { namaMapel: string; absensi: Record<string, number> }>);

    // Mengisi jumlah absensi berdasarkan hasil groupBy
    attendanceCounts.forEach(({ mapelKelasId, status, _count }) => {
      if (formattedAttendance[mapelKelasId]) {
        formattedAttendance[mapelKelasId].absensi[status] = _count.id;
      }
    });

    // Transformasi data agar absensi masuk ke dalam setiap siswa
    const transformedData = jurusan.map((j) => ({
      ...j,
      Kelas: j.Kelas.map((kelas) => ({
        ...kelas,
        MemberKelas: kelas.MemberKelas.map((member) => ({
          ...member,
          StudentProfil: {
            ...member.StudentProfil,
            Mapel: member.StudentProfil.MemberKelas[0].Kelas.MapelKelas.map(
              (mapelKelas: {
                Mapel: { id: number; namaMapel: string };
                nilai: { skor: number; studentProfilId: number }[];
                id: number;
              }) => ({
                id: mapelKelas.Mapel.id,
                namaMapel: mapelKelas.Mapel.namaMapel,
                nilai: mapelKelas.nilai.map((n) => ({
                  skor: n.skor,
                  studentProfilId: n.studentProfilId,
                })),
                absensi: formattedAttendance[mapelKelas.id]?.absensi || {
                  Hadir: 0,
                  Sakit: 0,
                  Izin: 0,
                  Alpa: 0,
                },
              })
            ),
          },
        })),
      })),
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw new Error("Gagal mengambil data formulir");
  }
};
