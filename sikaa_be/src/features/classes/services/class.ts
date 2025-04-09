import * as repository from "../repositories/class";
import { SemesterType } from "@prisma/client";

export const createClassService = async (data: {
  noKelas: string;
  academicYearId: string;
  semester: string;
  jurusanId: number;
}) => {
  if (!Object.values(SemesterType).includes(data.semester as SemesterType)) {
    throw new Error(
      `Invalid semester value. Expected one of: ${Object.values(
        SemesterType
      ).join(", ")}`
    );
  }

  const transformedData = {
    ...data,
    semester: data.semester as SemesterType,
  };

  return repository.createClass(transformedData);
};

export const getAllClassesService = async () => {
  return repository.findAllClasses();
};

export const getClassByIdService = async (id: number) => {
  const kelas = await repository.findClassById(id);
  if (!kelas) {
    throw new Error("Kelas tidak ditemukan");
  }
  return kelas;
};

export const updateClassService = async (
  id: number,
  data: {
    noKelas?: string;
    academicYearId?: string;
    semester?: SemesterType;
    jurusanId?: number;
  }
) => {
  return repository.updateClassById(id, data);
};

export const deleteClassService = async (id: number) => {
  await repository.deleteClassById(id);
};

export const getClassesByAcademicYearAndSemesterService = async (academicYearId: number, semester: SemesterType) => {
  return repository.findClassByAcademicYearAndSemester(academicYearId, semester);
};