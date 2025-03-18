import { Context } from "hono";
import * as achievementService from "../services/achievement";

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
