import * as repository from "../repositories/major";

export const createJurusanService = async (data: {
  nama: string;
  deskripsi?: string;
}) => {
  return repository.createJurusan(data);
};

export const getAllJurusanService = async () => {
  return repository.findAllJurusan();
};

export const getJurusanByIdService = async (id: number) => {
  const jurusan = await repository.findJurusanById(id);
  if (!jurusan) {
    throw new Error("Jurusan tidak ditemukan");
  }
  return jurusan;
};

export const updateJurusanByIdService = async (
  id: number,
  data: {
    nama?: string;
    deskripsi?: string;
  }
) => {
  return repository.updateJurusanById(id, data);
};

export const deleteJurusanService = async (id: number) => {
  await repository.deleteJurusanById(id);
};
