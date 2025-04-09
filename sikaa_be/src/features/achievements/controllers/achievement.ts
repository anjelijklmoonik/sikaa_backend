import { Context } from "hono";
import * as achievementService from "../services/achievement";
import prisma from "../../../configs/database";

export const createAchievementController = async (c: Context) => {
  try {
    const achievement = await c.req.json();
    const newAchievement = await achievementService.createAchievement(
      achievement
    );
    return c.json(newAchievement, 201);
  } catch (error) {
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

export const getAllAchievementController = async (c: Context) => {
  try {
    const achievement = await achievementService.getAllAchievement();
    return c.json(achievement, 200);
  } catch (error) {
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

export const getAchievementByIdController = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const achievement = await achievementService.getAchievementById(Number(id));
    return c.json(achievement, 200);
  } catch (error) {
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

export const updateAchievementController = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const achievement = await c.req.json();
    const updatedAchievement = await achievementService.updateAchievement(
      Number(id),
      achievement
    );
    return c.json(updatedAchievement, 200);
  } catch (error) {
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

export const deleteAchievementController = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await achievementService.deleteAchievement(Number(id));
    return c.json({ message: "Data berhasil dihapus" }, 200);
  } catch (error) {
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};

export const getAchievementByStudentController = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.userId) {
      return c.json({ error: "Unauthorized: userId tidak ditemukan" }, 401);
    }

    const userData = await prisma.users.findUnique({
      where: { id: user.userId },
      select: { studentProfilId: true },
    });

    if (!userData || !userData.studentProfilId) {
      return c.json({ error: "Student profile tidak ditemukan" }, 404);
    }

    console.log("studentProfilId:", userData.studentProfilId);

    const achievements = await achievementService.getAchievementByStudent(userData.studentProfilId);

    return c.json({
      message: "Data prestasi berhasil diambil",
      data: achievements,
    }, 200);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return c.json({ error: "Terjadi kesalahan internal" }, 500);
  }
};