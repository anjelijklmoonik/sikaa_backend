import prisma from "../../../configs/database";

export const createAcademicYear = async (year: number) => {
  return prisma.academicYear.create({
    data: { year },
  });
};

export const findAllAcademicYears = async () => {
  return prisma.academicYear.findMany();
};

export const findAcademicYearById = async (id: string) => {
  return prisma.academicYear.findUnique({
    where: { id },
  });
};

export const updateAcademicYearById = async (id: string, year: number) => {
  return prisma.academicYear.update({
    where: { id },
    data: { year },
  });
};

export const deleteAcademicYearById = async (id: string) => {
  return prisma.academicYear.delete({
    where: { id },
  });
};
