import * as mapelRepository from "../repositories/course";
import { MapelType } from "@prisma/client";

// Mendapatkan semua Mapel
export const getAllCourseService = async () => {
  return mapelRepository.findAllCourse();
};

// Mendapatkan Mapel berdasarkan ID
export const getCourseByIdService = async (id: number) => {
  const mapel = await mapelRepository.findCourseById(id);
  if (!mapel) {
    throw new Error("Mapel tidak ditemukan");
  }
  return mapel;
};

// Menambahkan Mapel baru
export const createCourseService = async (data: {
  type: MapelType;
  namaMapel: string;
  jurusanId?: number;
}) => {
  return mapelRepository.createCourse(data);
};

// Memperbarui Mapel berdasarkan ID
export const updateCourseByIdService = async (
  id: number,
  data: {
    type?: MapelType;
    namaMapel?: string;
    jurusanId?: number;
  }
) => {
  return mapelRepository.updateCourseById(id, data);
};

// Menghapus Mapel berdasarkan ID
export const deleteCourseService = async (id: number) => {
  return mapelRepository.deleteCourseById(id);
};
