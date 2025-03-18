import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "./../middleware/restrict";

import {
  createAchievementController,
  getAllAchievementController,
  getAchievementByIdController,
  updateAchievementController,
  deleteAchievementController,
} from "../features/achievements/controllers/achievement";

const achievement = new Hono();

achievement.post(
  "/",
  authenticate,
  authorizeAdmin,
  createAchievementController
);
achievement.get("/", authenticate, authorizeAdmin, getAllAchievementController);
achievement.get(
  "/:id",
  authenticate,
  authorizeAdmin,
  getAchievementByIdController
);
achievement.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateAchievementController
);
achievement.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteAchievementController
);

export default achievement;
