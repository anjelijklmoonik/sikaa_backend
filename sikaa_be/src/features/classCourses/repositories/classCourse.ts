import prisma from "../../../configs/database";

// Menambahkan MapelKelas baru
export const createClassCourse = async (data: {
  mapelId: number;
  kelasId: number;
}) => {
  return prisma.mapelKelas.create({
    data,
  });
};

// Mendapatkan semua MapelKelas
export const findAllClassCourse = async () => {
  return prisma.mapelKelas.findMany({
    include: {
      Mapel: true,
      kelas: true,
    },
  });
};

// Mendapatkan MapelKelas berdasarkan MapelId dan KelasId
export const findClassCourseById = async (mapelId: number, kelasId: number) => {
  return prisma.mapelKelas.findUnique({
    where: {
      mapelId_kelasId: {
        mapelId,
        kelasId,
      },
    },
    include: {
      Mapel: true,
      kelas: true,
    },
  });
};

// Menghapus MapelKelas berdasarkan MapelId dan KelasId
export const deleteClassCourseById = async (
  mapelId: number,
  kelasId: number
) => {
  return prisma.mapelKelas.delete({
    where: {
      mapelId_kelasId: {
        mapelId,
        kelasId,
      },
    },
  });
};

// export const updateClassCourseById = async (
//   mapelId: number,
//   kelasId: number,
//   data: { nilai?: number }
// ) => {
//   return prisma.mapelKelas.update({
//     where: {
//       mapelId_kelasId: {
//         mapelId,
//         kelasId,
//       },
//     },
//     data,
//   });
// };
