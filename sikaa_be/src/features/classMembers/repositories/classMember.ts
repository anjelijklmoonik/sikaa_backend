import prisma from "../../../configs/database";

export const createMemberKelas = async (data: {
  kelasId: number;
  studentId: number;
}) => {
  return prisma.memberKelas.create({
    data,
  });
};

export const getMemberKelasById = async (id: number) => {
  return prisma.memberKelas.findUnique({
    where: { id },
    include: { Kelas: true, StudentProfil: true },
  });
};

export const getAllMemberKelas = async () => {
  return prisma.memberKelas.findMany({
    include: { Kelas: true, StudentProfil: true },
  });
};

export const updateMemberKelasById = async (
  id: number,
  data: Partial<{ kelasId: number; studentId: number }>
) => {
  return prisma.memberKelas.update({
    where: { id },
    data,
  });
};

export const deleteMemberKelasById = async (id: number) => {
  return prisma.memberKelas.delete({
    where: { id },
  });
};
