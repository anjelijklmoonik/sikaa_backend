import * as nilaiRepository from "../repositories/grade";

// export const nilaiService = {
//   async createNilai(data: {
//     skor: number;
//     mapelId: number;
//     memberKelasId: number;
//   }) {
//     return nilaiRepository.create(data);
//   },

//   async getAllNilai() {
//     return nilaiRepository.getAll();
//   },

//   async getNilaiById(id: number) {
//     return nilaiRepository.getById(id);
//   },

//   async updateNilai(id: number, data: { skor?: number; mapelId?: number }) {
//     return nilaiRepository.update(id, data);
//   },

//   async deleteNilai(id: number) {
//     return nilaiRepository.delete(id);
//   },
// };

export const addNilai = async (
  studentProfileId: number,
  mapelKelasId: number,
  skor: number
) => {
  return await nilaiRepository.createNilai(
    studentProfileId,
    mapelKelasId,
    skor
  );
};

export const fetchNilaiByKelas = async (kelasId: number, semester: string) => {
  return await nilaiRepository.getNilaiByKelas(kelasId, semester);
};

export const modifyNilai = async (id: number, skor: number) => {
  return await nilaiRepository.updateNilai(id, skor);
};

export const getGradesLessonByStudent = async (userId: number) => {
  return await nilaiRepository.getGradesLessonByStudent(userId);
};

export const getFormData = async () => {
  return await nilaiRepository.getFormData();
};