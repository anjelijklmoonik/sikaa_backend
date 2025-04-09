import { Hono } from "hono";
import {
  createStudentProfileController,
  getAllStudentProfilesController,
  getStudentProfileByIdController,
  updateStudentProfileController,
  deleteStudentProfileController,
  countStudentController,
  updateStudentProfileByTokenController,
} from "../features/studentProfiles/controllers/user";
import {
  authenticate,
  authorizeAdmin,
  authorizeStudent,
} from "./../middleware/restrict";

const studentProfil = new Hono();

studentProfil.get(
  "/count",
  authenticate,
  authorizeAdmin,
  countStudentController
);
studentProfil.post(
  "/",
  authenticate,
  authorizeAdmin,
  createStudentProfileController
);
studentProfil.get(
  "/",
  authenticate,
  authorizeAdmin,
  getAllStudentProfilesController
);
studentProfil.get(
  "/:id",
  authenticate,
  authorizeAdmin,
  getStudentProfileByIdController
);
studentProfil.put(
  "/student",
  authenticate,
  authorizeStudent,
  updateStudentProfileByTokenController
);
studentProfil.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  updateStudentProfileController
);

studentProfil.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteStudentProfileController
);

export default studentProfil;
