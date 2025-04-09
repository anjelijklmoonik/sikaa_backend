import * as achievementRepository from "../repositories/achievement";

interface Achievement {
  judul: string;
  deskripsi: string;
  tanggal: string;
  studentProfilId: number;
}

export const createAchievement = async (achievement: Achievement) => {
  return await achievementRepository.createAchievement(achievement);
};

export const getAllAchievement = async () => {
  return await achievementRepository.getAllAchievement();
};

export const getAchievementById = async (id: number) => {
  return await achievementRepository.getAchievementById(id);
};

export const updateAchievement = async (
  id: number,
  achievement: Achievement
) => {
  return await achievementRepository.updateAchievement(id, achievement);
};

export const deleteAchievement = async (id: number) => {
  return await achievementRepository.deleteAchievement(id);
};

export const getAchievementByStudent = async (studentId: number) => {
  return await achievementRepository.getAchievementByStudentId(studentId);
};