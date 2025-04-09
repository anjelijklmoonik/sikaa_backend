import { Hono } from "hono";
import { authenticate, authorizeAdmin, authorizeParent, authorizeStudent } from "./../middleware/restrict";

import {
  createAchievementController,
  getAllAchievementController,
  getAchievementByIdController,
  updateAchievementController,
  deleteAchievementController,
  getAchievementByStudentController,
} from "../features/achievements/controllers/achievement";

const achievement = new Hono();

achievement.get(
  "/student",
  authenticate,
  authorizeStudent,
  getAchievementByStudentController
);
achievement.get(
  "/parent",
  authenticate,
  authorizeParent,
  getAchievementByStudentController
);
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
