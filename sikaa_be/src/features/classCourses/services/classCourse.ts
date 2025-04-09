import * as mapelKelasRepository from "../repositories/classCourse";

// Menambahkan MapelKelas baru
export const createClassCourseService = async (data: {
  mapelId: number;
  kelasId: number;
}) => {
  return mapelKelasRepository.createClassCourse(data);
};

// Mendapatkan semua MapelKelas
export const getAllClassCourseService = async () => {
  return mapelKelasRepository.findAllClassCourse();
};

// Mendapatkan MapelKelas berdasarkan MapelId dan KelasId
export const getClassCourseByIdService = async (
  mapelId: number,
  kelasId: number
) => {
  const mapelKelas = await mapelKelasRepository.findClassCourseById(
    mapelId,
    kelasId
  );
  if (!mapelKelas) {
    throw new Error("MapelKelas tidak ditemukan");
  }
  return mapelKelas;
};

// Menghapus MapelKelas berdasarkan MapelId dan KelasId
export const deleteClassCourseByIdService = async (
  mapelId: number,
  kelasId: number
) => {
  return mapelKelasRepository.deleteClassCourseById(mapelId, kelasId);
};

// export const updateClassCourseByIdService = async (
//   mapelId: number,
//   kelasId: number,
//   data: { nilai?: number }
// ) => {
//   try {
//     return await mapelKelasRepository.updateClassCourseById(
//       mapelId,
//       kelasId,
//       data
//     );
//   } catch (error) {
//     throw new Error(
//       `Gagal memperbarui MapelKelas: ${(error as Error).message}`
//     );
//   }
// };
