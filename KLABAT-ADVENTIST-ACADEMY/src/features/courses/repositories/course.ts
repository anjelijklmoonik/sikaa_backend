import { PrismaClient, MapelType } from "@prisma/client";
const prisma = new PrismaClient();

// Menambahkan Mapel baru
export const createCourse = async (data: {
  type: MapelType;
  namaMapel: string;
  jurusanId?: number;
}) => {
  const { jurusanId, ...mapelData } = data;

  return prisma.mapel.create({
    data: {
      ...mapelData,
      Jurusan: jurusanId ? { connect: { id: jurusanId } } : undefined, // 🔥 FIXED!
    },
  });
};

// Mendapatkan semua Mapel
export const findAllCourse = async () => {
  return prisma.mapel.findMany({
    include: {
      Jurusan: true, // Menampilkan relasi dengan Jurusan
    },
  });
};

// Mendapatkan Mapel berdasarkan ID
export const findCourseById = async (id: number) => {
  return prisma.mapel.findUnique({
    where: { id },
    include: {
      Jurusan: true, // Menampilkan relasi dengan Jurusan
    },
  });
};

// Memperbarui Mapel berdasarkan ID
export const updateCourseById = async (
  id: number,
  data: {
    type?: MapelType;
    namaMapel?: string;
    jurusanId?: number;
  }
) => {
  return prisma.mapel.update({
    where: { id },
    data,
  });
};

// Menghapus Mapel berdasarkan ID
export const deleteCourseById = async (id: number) => {
  return prisma.mapel.delete({
    where: { id },
  });
};
