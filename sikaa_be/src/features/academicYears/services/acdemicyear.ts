import * as repository from "../repositories/acdemicyear";

export const createAcademicYearService = async (year: number) => {
  return repository.createAcademicYear(year);
};

export const getAllAcademicYearsService = async () => {
  return repository.findAllAcademicYears();
};

export const getAcademicYearByIdService = async (id: string) => {
  const academicYear = await repository.findAcademicYearById(id);
  if (!academicYear) {
    throw new Error("Tahun akademik tidak ditemukan");
  }
  return academicYear;
};

export const updateAcademicYearService = async (id: string, year: number) => {
  return repository.updateAcademicYearById(id, year);
};

export const deleteAcademicYearService = async (id: string) => {
  await repository.deleteAcademicYearById(id);
};
