import { SemesterType } from "@prisma/client";
import prisma from "../../../configs/database";

export const createClass = async (data: {
  noKelas: string;
  academicYearId: string;
  semester: SemesterType;
  jurusanId: number;
}) => {
  return prisma.kelas.create({
    data: {
      ...data,
      academicYearId: Number(data.academicYearId),
    },
  });
};

export const findAllClasses = async () => {
  return prisma.kelas.findMany({
    include: {
      AcademicYear: true,
      Jurusan: true,
    },
  });
};

export const findClassById = async (id: number) => {
  return prisma.kelas.findUnique({
    where: { id },
    include: {
      AcademicYear: true,
      Jurusan: true,
    },
  });
};

export const updateClassById = async (
  id: number,
  data: {
    noKelas?: string;
    academicYearId?: string;
    semester?: SemesterType;
    jurusanId?: number;
  }
) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  return prisma.kelas.update({
    where: { id },
    data: filteredData,
  });
};

export const deleteClassById = async (id: number) => {
  return prisma.kelas.delete({
    where: { id },
  });
};

export const findClassByAcademicYearAndSemester = async (academicYearId: number, semester: SemesterType) => {
  return prisma.kelas.findMany({
    where: {
      academicYearId,
      semester,
    },
    include: {
      AcademicYear: true,
      Jurusan: true,
    },
  });
}