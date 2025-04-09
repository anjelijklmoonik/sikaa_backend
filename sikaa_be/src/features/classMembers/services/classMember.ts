import * as memberKelasRepository from "../repositories/classMember";

export const createMemberKelasService = async (data: {
  kelasId: number;
  studentId: number;
}) => {
  return memberKelasRepository.createMemberKelas(data);
};

export const getMemberKelasByIdService = async (id: number) => {
  return memberKelasRepository.getMemberKelasById(id);
};

export const getAllMemberKelasService = async () => {
  return memberKelasRepository.getAllMemberKelas();
};

export const updateMemberKelasByIdService = async (
  id: number,
  data: Partial<{ kelasId: number; studentId: number }>
) => {
  return memberKelasRepository.updateMemberKelasById(id, data);
};

export const deleteMemberKelasByIdService = async (id: number) => {
  return memberKelasRepository.deleteMemberKelasById(id);
};
