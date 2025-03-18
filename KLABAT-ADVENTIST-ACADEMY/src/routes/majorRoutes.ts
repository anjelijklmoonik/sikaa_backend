import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "./../middleware/restrict";

import {
  getAllMajorController,
  getMajorByIdController,
  createMajorController,
  updateMajorByIdController,
  deleteMajorController,
} from "../features/majors/controllers/major";

const major = new Hono();

major.post("/", authenticate, authorizeAdmin, createMajorController);
major.get("/", authenticate, authorizeAdmin, getAllMajorController);
major.get("/:id", authenticate, authorizeAdmin, getMajorByIdController);
major.put("/:id", authenticate, authorizeAdmin, updateMajorByIdController);
major.delete("/:id", authenticate, authorizeAdmin, deleteMajorController);

export default major;
