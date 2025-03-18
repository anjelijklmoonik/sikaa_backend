import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "../middleware/restrict";

import {
  getAllCourseController,
  createCourseController,
  updateCourseByIdController,
  deleteCourseController,
  getCourseByIdController,
} from "../features/courses/controllers/course";

const course = new Hono();

course.post("/", authenticate, authorizeAdmin, createCourseController);
course.get("/", authenticate, authorizeAdmin, getAllCourseController);
course.get("/:id", authenticate, authorizeAdmin, getCourseByIdController);
course.put("/:id", authenticate, authorizeAdmin, updateCourseByIdController);
course.delete("/:id", authenticate, authorizeAdmin, deleteCourseController);

export default course;
