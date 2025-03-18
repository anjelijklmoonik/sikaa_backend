import { Hono } from "hono";
import { authenticate, authorizeAdmin } from "./../middleware/restrict";
import {
  createClassCourseController,
  getAllClassCourseController,
  getClassCourseByIdController,
  deleteClassCourseByIdController,
} from "../features/classCourses/controllers/classCourse";

const classCourse = new Hono();

classCourse.post(
  "/",
  authenticate,
  authorizeAdmin,
  createClassCourseController
);
classCourse.get("/", authenticate, authorizeAdmin, getAllClassCourseController);
classCourse.get(
  "/:mapelId/:kelasId",
  authenticate,
  authorizeAdmin,
  getClassCourseByIdController
);
classCourse.delete(
  "/:mapelId/:kelasId",
  authenticate,
  authorizeAdmin,
  deleteClassCourseByIdController
);

export default classCourse;
