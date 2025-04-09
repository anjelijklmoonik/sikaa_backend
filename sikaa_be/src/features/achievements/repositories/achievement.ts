import prisma from "../../../configs/database";

interface Achievement {
  judul: string;
  deskripsi: string;
  tanggal: string;
  studentProfilId: number;
}

export const createAchievement = async (achievement: Achievement) => {
  try {
    const newAchievement = await prisma.pencapaian.create({
      data: {
        judul: achievement.judul,
        deskripsi: achievement.deskripsi,
        tanggal: new Date(achievement.tanggal),
        studentProfilId: achievement.studentProfilId,
      },
    });
    return newAchievement;
  } catch (error) {
    console.error(error);
    throw new Error("Prestasi baru tidak bisa dibuat");
  }
};

export const getAllAchievement = async () => {
  try {
    return await prisma.pencapaian.findMany();
  } catch (error) {
    console.error(error);
    throw new Error("Prestasi tidak bisa dibaca");
  }
};

export const getAchievementById = async (id: number) => {
  try {
    const achievement = await prisma.pencapaian.findUnique({
      where: { id: Number(id) },
    });
    if (!achievement) throw new Error("Data tidak ditemukan");
    return achievement;
  } catch (error) {
    console.error(error);
    throw new Error("Error membaca data");
  }
};

export const updateAchievement = async (
  id: number,
  achievement: Achievement
) => {
  try {
    const updatedAchievement = await prisma.pencapaian.update({
      where: { id: Number(id) },
      data: {
        judul: achievement.judul,
        deskripsi: achievement.deskripsi,
        tanggal: new Date(achievement.tanggal),
        studentProfilId: achievement.studentProfilId,
      },
    });
    return updatedAchievement;
  } catch (error) {
    console.error(error);
    throw new Error("Error mengupdate data");
  }
};

export const deleteAchievement = async (id: number) => {
  try {
    await prisma.pencapaian.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error menghapus data");
  }
};

export const getAchievementByStudentId = async (studentId: number) => {
  try {
    return await prisma.pencapaian.findMany({
      where: { studentProfilId: studentId },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error membaca data");
  }
};
